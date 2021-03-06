import express, {Request, Response} from 'express';
import {requireAuth, validateRequest} from "@fdfipubook/common";
import {body} from "express-validator";
import {PostCreatedPublisher} from "../events/publishers/posts-created-publisher";
import {natsWrapper} from "../nats-wrapper";
import {cloudinary} from "../utils/cloudinary";
import {Post} from "../models/post";

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

        let postImage;
        if (req.file) {
            const uploadedImage = await cloudinary.uploader.upload(req.file?.path);
            postImage = uploadedImage.url;
        }

        //@ts-ignore
        const post = Post.build({
            postText,
            postImage,
            postLikes: undefined,
            userId: req.currentUser!.id,
            userName,
            userAvatar,
            created: new Date(),
        })

        await post.save();
        new PostCreatedPublisher(natsWrapper.client).publish({
            id: post.id,
            postText: post.postText,
            postImage: post.postImage,
            userId: post.userId,
            userName: post.userName,
            userAvatar: post.userAvatar,
            created: post.created,
            version: post.version,
        })

        res.status(201).send(post);
    })


export {router as createPostRouter}