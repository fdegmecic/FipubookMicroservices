import express, {Request, Response} from 'express';
import {requireAuth, validateRequest} from "@fdfipubook/common";
import {body} from "express-validator";
import {Post} from "../models/post";
import {PostCreatedPublisher} from "../events/post-created-publisherr";
import {natsWrapper} from "../nats-wrapper";

const router = express.Router();

router.post('/api/posts', requireAuth, [
    body('postText')
        .not()
        .isEmpty()
        .withMessage('Text is required'),
], validateRequest, async (req: Request, res: Response) => {
    const {postText} = req.body;

    const post = Post.build({
        postText,
        userId: req.currentUser!.id,
        created: new Date(),
    })

    await post.save();
    new PostCreatedPublisher(natsWrapper.client).publish({
        id: post.id,
        postText: post.postText,
        userId: post.userId,
    })

    res.status(201).send(post);
})


export {router as createPostRouter}