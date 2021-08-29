import express, {Request, Response} from 'express';
import {NotFoundError, requireAuth, BadRequestError} from "@fdfipubook/common";
import {Post} from "../models/post";
import {PostLike} from "../models/postLike";

const router = express.Router();

router.patch('/api/posts/like/:id', requireAuth, async (req: Request, res: Response) => {
    const post = await Post.findById(req.params.id)

    if (!post) {
        throw new NotFoundError();
    }

    const existingPostLike = await PostLike.find({userId: req.currentUser!.id, post: post});

    if (existingPostLike.length > 0) {
        throw new BadRequestError('Post already liked!')
    }

    //@ts-ignore
    const postLike = PostLike.build({
        post: post,
        userId: req.currentUser!.id,
    })
    await postLike.save();

    const updated = await Post.findByIdAndUpdate(post.id, {$push: {postLikes: postLike}}, {
        new: true,
        useFindAndModify: false
    }).populate('postLikes');


    res.status(200).send(updated)
})

export {router as likePostRouter}