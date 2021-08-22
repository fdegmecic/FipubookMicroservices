import express, {Request, Response} from 'express';
import {Comment} from "../models/comment";
import {Post} from "../models/post";
import {NotFoundError} from "@fdfipubook/common";

const router = express.Router();

router.get('/api/comments/:postId', async (req: Request, res: Response) => {
    const post = await Post.findById(req.params.postId)

    if(!post){
        throw new NotFoundError();
    }

    const comments = await Comment.find({post})

    res.send(comments);
})

export {router as getCommentsRouter}