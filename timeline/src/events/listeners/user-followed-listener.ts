import {Message} from 'node-nats-streaming';
import {Subjects, Listener, UserFollowedEvent} from "@fdfipubook/common";
import {queueGroupName} from "./queue-group-name";
import {Follower} from "../../models/follower";

export class UserFollowedListener extends Listener<UserFollowedEvent> {
    readonly subject = Subjects.UserFollowed;
    queueGroupName = queueGroupName;

    async onMessage(data: UserFollowedEvent["data"], msg: Message) {
        const {followeeId, followerId} = data;
        const post = Follower.build({
            followeeId, followerId
        });
        await post.save();

        msg.ack();
    }
}