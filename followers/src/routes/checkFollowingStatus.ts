import express, {Request, Response} from 'express';
import {NotFoundError, requireAuth} from "@fdfipubook/common";
import {User} from "../models/user";
import {Follower} from "../models/follower";

const router = express.Router();

router.get('/api/follower', requireAuth, async (req: Request, res: Response) => {
    const user = await User.findById(req.currentUser!.id);

    if(!user) {
        throw new NotFoundError();
    }

    const follower = await Follower.findOne({followerId: user.id});

    if(!follower) {
        res.status(201).send(false);
    } else {
        res.status(201).send(true);
    }
})

export {router as checkUserFollowingRouter}