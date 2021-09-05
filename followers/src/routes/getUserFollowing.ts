import express, {Request, Response} from 'express';
import {NotFoundError, requireAuth} from "@fdfipubook/common";
import {User} from "../models/user";
import {Follower} from "../models/follower";

const router = express.Router();

router.get('/api/followers/following/:id', requireAuth, async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);

    if(!user) {
        throw new NotFoundError();
    }

    const following = await Follower.find({followingId: user.id});

    if(!following) {
        throw new NotFoundError();
    }

    res.status(201).send(following);
})


export {router as getUserFollowingRouter}