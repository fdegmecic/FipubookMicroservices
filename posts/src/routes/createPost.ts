import express, {Request, Response} from 'express';
import {requireAuth, validateRequest} from "@fdfipubook/common";
import {body} from "express-validator";
import {Post} from "../models/post";
import {PostCreatedPublisher} from "../events/publishers/posts-created-publisher";
import {natsWrapper} from "../nats-wrapper";
import {cloudinary} from "../utils/cloudinary";

const upload = require("../utils/multer");

const router = express.Router();

router.post('/api/posts',
    upload.single('image'),
    requireAuth, [
        body('postText')
            .not()
            .isEmpty()
            .withMessage('Text is required'),
    ], validateRequest, async (req: Request, res: Response) => {
        const {postText, userName, userAvatar} = req.body;

        let postUrl = "";
        if (req.file) {
            const uploadedImage = await cloudinary.uploader.upload(req.file?.path);
            postUrl = uploadedImage.url;
        }

        //@ts-ignore
        const post = Post.build({
            postText,
            postUrl,
            userId: req.currentUser!.id,
            userName,
            userAvatar,
            created: new Date(),
        })

        await post.save();
        new PostCreatedPublisher(natsWrapper.client).publish({
            id: post.id,
            postText: post.postText,
            userId: post.userId,
            userName: post.userName,
            userAvatar: post.userAvatar,
            created: post.created,
            version: post.version,
        })

        res.status(201).send(post);
    })


export {router as createPostRouter}