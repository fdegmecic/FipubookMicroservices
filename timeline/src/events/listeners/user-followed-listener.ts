import {Message} from 'node-nats-streaming';
import {Subjects, Listener, UserFollowedEvent} from "@fdfipubook/common";
import {queueGroupName} from "./queue-group-name";
import {Follower} from "../../models/follower";

export class UserFollowedListener extends Listener<UserFollowedEvent> {
    readonly subject = Subjects.UserFollowed;
    queueGroupName = queueGroupName;

    async onMessage(data: UserFollowedEvent["data"], msg: Message) {
        const {followerId, followingId} = data;

        const follower = Follower.build({
            followerId: followerId,
            followingId: followingId
        });

        await follower.save();

        msg.ack();
    }
}