import express, {Request, Response} from 'express';
import {Post} from "../models/post";
import {requireAuth} from "@fdfipubook/common";
import {Follower} from "../models/follower";

const router = express.Router();

router.get('/api/timeline', requireAuth, async (req: Request, res: Response) => {
    const followers = await Follower.find({followerId: req.currentUser!.id});

    let followerIds: string[] = [];
    followerIds.push(req.currentUser!.id);
    followers.map(follower => followerIds.push(follower.followingId))

    const posts = await Post.find({userId: {$in: followerIds}})
        .populate('postLikes')
        .sort({created: -1});

    res.send(posts);
})

export {router as getUserTimelineRouter}
