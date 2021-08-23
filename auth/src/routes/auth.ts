import express, {Request, Response} from "express";
import {body} from 'express-validator';
import jwt from 'jsonwebtoken';
import {currentUser, validateRequest, BadRequestError} from '@fdfipubook/common'

import {User} from "../models/user";
import {Password} from "../utils/password";
import {UserRegisteredPublisher} from "../events/publishers/user-registered-publisher";
import {natsWrapper} from "../nats-wrapper";

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({min: 4, max: 20})
        .withMessage('Password must be between 4 and 20 characters long'),
    body('name')
        .not()
        .isEmpty()
        .withMessage('Name is required'),
], validateRequest, async (req: Request, res: Response) => {
    const {email, password, name} = req.body;

    const existingUser = await User.findOne({email});

    if (existingUser) {
        throw new BadRequestError('Email in use');
    }

    const user = User.build({email, password, name});
    await user.save();

    new UserRegisteredPublisher(natsWrapper.client).publish({
        id: user.id,
        name: user.name,
    })

    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY!);

    req.session = {
        jwt: userJwt
    };

    res.status(201).send(user);
});

router.post('/api/users/signin', [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('You must supply a password')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const {email, password} = req.body;

        const existingUser = await User.findOne({email});
        if (!existingUser) {
            throw new BadRequestError('Invalid credentials');
        }

        const passwordsMatch = await Password.compare(existingUser.password, password);

        if (!passwordsMatch) {
            throw new BadRequestError('Invalid credentials')
        }

        const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
        }, process.env.JWT_KEY!);

        req.session = {
            jwt: userJwt
        };

        res.status(200).send(existingUser);
    });

router.get('/api/users/currentuser', currentUser, (req, res) => {
    res.send({currentUser: req.currentUser || null});
});

router.post('/api/users/signout', (req, res) => {
    req.session = null;

    res.send({});
});

export {router as authRouter};
