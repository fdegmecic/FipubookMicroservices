import express, {Request, Response} from 'express';
import {body} from "express-validator";
import {validateRequest, NotFoundError, requireAuth, BadRequestError} from "@fdfipubook/common";
import {Post} from "../models/post";
import {natsWrapper} from "../nats-wrapper";
import {PostUpdatedPublisher} from "../events/publishers/post-updated-publisher";

const router = express.Router();

router.patch('/api/posts/:id', requireAuth, [
    body('updateText')
        .not()
        .isEmpty()
        .withMessage('Update text is required')
], validateRequest, async (req: Request, res: Response) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        throw new NotFoundError();
    }

    if (post.userId !== req.currentUser!.id) {
        throw new BadRequestError('This user cant edit this post')
    }

    post.set({
        postText: req.body.updateText,
    })

    new PostUpdatedPublisher(natsWrapper.client).publish({
        id: post.id,
        postText: post.postText,
        userId: post.userId,
        version: post.version,
    })

    await post.save();

    res.status(200).send(post);
})

export {router as updatePostRouter}