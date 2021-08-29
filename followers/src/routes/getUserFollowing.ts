import express, {Request, Response} from 'express';
import {NotFoundError, requireAuth} from "@fdfipubook/common";
import {User} from "../models/user";
import {Follower} from "../models/follower";

const router = express.Router();

router.get('/api/followers/following', requireAuth, async (req: Request, res: Response) => {
    const user = await User.findById(req.currentUser!.id);

    if(!user) {
        throw new NotFoundError();
    }

    const followers = await Follower.find({followingId: user.id});

    if(!followers) {
        throw new NotFoundError();
    }

    res.status(201).send(followers);
})


export {router as getUserFollowingRouter}