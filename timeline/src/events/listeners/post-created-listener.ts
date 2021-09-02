import {Message} from 'node-nats-streaming';
import {Subjects, Listener, PostCreatedEvent} from "@fdfipubook/common";
import {Post} from "../../models/post";
import {queueGroupName} from "./queue-group-name";

export class PostCreatedListener extends Listener<PostCreatedEvent> {
    readonly subject = Subjects.PostCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: PostCreatedEvent["data"], msg: Message) {
        const {id, postText, postImage, userId, userName, userAvatar, created, version} = data;

        const post = Post.build({
            id, postText, postImage, userId, userName, userAvatar, created, version
        });
        await post.save();

        msg.ack();
    }
}