import express, {Request, Response} from 'express';
import {Post} from "../models/post";
import {requireAuth} from "@fdfipubook/common";
import {Follower} from "../models/follower";

const router = express.Router();

router.get('/api/timeline', requireAuth, async (req: Request, res: Response) => {
    const followers = await Follower.find({});

    console.log(followers)

    const posts = await Post.find({}).populate('postLikes').sort({created: -1});

    res.send(posts);
})

export {router as getUserPosts}