import {Message} from 'node-nats-streaming';
import {Subjects, Listener, UserUnfollowedEvent} from "@fdfipubook/common";
import {queueGroupName} from "./queue-group-name";
import {Follower} from "../../models/follower";

export class UserUnfollowedListener extends Listener<UserUnfollowedEvent> {
    readonly subject = Subjects.UserUnfollowed;
    queueGroupName = queueGroupName;

    async onMessage(data: UserUnfollowedEvent["data"], msg: Message) {
        const {followerId, followingId} = data;

        await Follower.findOneAndDelete({followerId: followerId, followingId: followingId})

        msg.ack();
    }
}