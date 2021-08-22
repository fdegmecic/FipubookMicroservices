import express, {Request, Response} from 'express';
import {body} from "express-validator";
import {validateRequest, NotFoundError, requireAuth, NotAuthorizedError} from "@fdfipubook/common";
import {Comment} from "../models/comment";

const router = express.Router();

router.put('/api/comments/:id', requireAuth, [
    body('updateText')
        .not()
        .isEmpty()
        .withMessage('Text is required')
], validateRequest, async (req: Request, res: Response) => {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
        throw new NotFoundError();
    }

    if (comment.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }

    comment.set({
        commentText: req.body.updateText,
    })

    await comment.save();

    res.status(200).send(comment);
})

export {router as updateCommentRouter}