import express, {Request, Response} from 'express';
import {BadRequestError, NotFoundError, requireAuth} from "@fdfipubook/common";
import {User} from "../models/user";
import {Follower} from "../models/follower";
import {natsWrapper} from "../nats-wrapper";
import {UserUnfollowedPublisher} from "../events/publishers/user-unfollowed-publisher";

const router = express.Router();

router.delete('/api/followers/:userId', requireAuth, async (req: Request, res: Response) => {
    const follower = await User.findById(req.currentUser!.id);
    const following = await User.findById(req.params.userId);

    if (!following || !follower) {
        throw new NotFoundError();
    }

    const resolveIfFollowing = await Follower.findOne({followerId: req.currentUser!.id, followingId: req.params.userId})

    if(!resolveIfFollowing) {
        throw new BadRequestError('User not followed')
    }

    await Follower.findOneAndDelete({followerId: follower.id, followingId: following.id})

    new UserUnfollowedPublisher(natsWrapper.client).publish({
        followerId: req.currentUser!.id,
        followingId: req.params.userId,
    })

    res.status(200).send(true);
})


export {router as unfollowUserRouter}