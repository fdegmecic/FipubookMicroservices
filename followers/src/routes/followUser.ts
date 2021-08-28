import express, {Request, Response} from 'express';
import {NotFoundError, requireAuth} from "@fdfipubook/common";
import {User} from "../models/user";
import {Follower} from "../models/follower";

const router = express.Router();

router.post('/api/followers/:userId', requireAuth, async (req: Request, res: Response) => {
    const follower = await User.findById(req.currentUser!.id);
    const following = await User.findById(req.params.userId);

    if(!following || ! follower) {
        throw new NotFoundError();
    }

    const follow = Follower.build({
        followerId: follower.id,
        followingId: following.id,
        followingName: following.name,
        followingAvatar: following.avatar,
    })

    await follow.save();


    res.status(201).send(follow);
})


export {router as followUserRouter}