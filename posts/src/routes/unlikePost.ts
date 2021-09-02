import express, {Request, Response} from 'express';
import {BadRequestError, NotFoundError, requireAuth} from "@fdfipubook/common";
import {Post} from "../models/post";
import {PostLike} from "../models/postLike";
import {natsWrapper} from "../nats-wrapper";
import {PostUnlikedPublisher} from "../events/publishers/post-unliked-publisher";

const router = express.Router();

router.delete('/api/posts/like/:id', requireAuth, async (req: Request, res: Response) => {
    const post = await Post.findById(req.params.id)

    if (!post) {
        throw new NotFoundError();
    }

    const {_id: postId} = post

    const existingPostLike = await PostLike.findOne({userId: req.currentUser!.id, post: postId});

    if (!existingPostLike) {
        throw new BadRequestError('Cannot unlike this post')
    }

    const {_id: postLikeId} = existingPostLike;

    await Post.findByIdAndUpdate(post.id, {
        $pull: {
            postLikes: {_id: postLikeId, userId: req.currentUser!.id}
        }
    }, {
        new: true,
        useFindAndModify: false
    });

    new PostUnlikedPublisher(natsWrapper.client).publish({
        postId: postId,
        userId: req.currentUser!.id,
        postLikeId: postLikeId,
    })

    await PostLike.findByIdAndDelete(postLikeId);

    res.status(200).send(true);
})

export {router as unlikePostRouter}