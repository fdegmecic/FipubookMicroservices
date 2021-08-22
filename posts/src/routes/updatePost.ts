import express, {Request, Response} from 'express';
import {body} from "express-validator";
import {validateRequest, NotFoundError, requireAuth, NotAuthorizedError} from "@fdfipubook/common";
import {Post} from "../models/post";

const router = express.Router();

router.patch('/api/posts/:id', requireAuth, [
    body('updateText')
        .not()
        .isEmpty()
        .withMessage('Post text is required')
], validateRequest, async (req: Request, res: Response) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        throw new NotFoundError();
    }

    if (post.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }

    post.set({
        postText: req.body.updateText,
    })

    await post.save();

    res.status(200).send(post);
})

export {router as updatePostRouter}