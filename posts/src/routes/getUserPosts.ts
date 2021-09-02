import express, {Request, Response} from 'express';
import {Post} from "../models/post";

const router = express.Router();

router.get('/api/posts/:userId', async (req: Request, res: Response) => {
    const posts = await Post.find({}).populate('postLikes').sort({created: -1});

    res.send(posts);
})

export {router as getUserPosts}
