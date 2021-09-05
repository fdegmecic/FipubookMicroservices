import mongoose from 'mongoose';
import {natsWrapper} from "./nats-wrapper";

import {app} from "./app";
import {PostCreatedListener} from "./events/listeners/post-created-listener";
import {UserFollowedListener} from "./events/listeners/user-followed-listener";
import {PostUpdatedListener} from "./events/listeners/post-updated-listener";
import {PostLikedListener} from "./events/listeners/post-liked-listener";
import {PostUnlikedListener} from "./events/listeners/post-unliked-listener";
import {UserUnfollowedListener} from "./events/listeners/user-unfollowed-listener";

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY not defined')
    }

    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined')
    }

    if (!process.env.NATS_CLIENT_ID) {
        throw new Error('NATS_CLIENT_ID must be defined')
    }

    if (!process.env.NATS_URL) {
        throw new Error('NATS_URL must be defined')
    }

    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error('NATS_CLUSTER_ID must be defined')
    }

    try {
        await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID,
            process.env.NATS_CLIENT_ID,
            process.env.NATS_URL,
        );

        natsWrapper.client.on('close', () => {
            console.log('NATS connection closed')
            process.exit()
        })

        process.on('SIGINT', () => natsWrapper.client.close())
        process.on('SIGTERM', () => natsWrapper.client.close())

        new PostCreatedListener(natsWrapper.client).listen();
        new PostUpdatedListener(natsWrapper.client).listen();
        new UserFollowedListener(natsWrapper.client).listen();
        new UserUnfollowedListener(natsWrapper.client).listen();
        new PostLikedListener(natsWrapper.client).listen();
        new PostUnlikedListener(natsWrapper.client).listen();

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        app.listen(3000, () => {
            console.log('Listening on port 3000!!');
        })
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log(err);
    }
}

start();
