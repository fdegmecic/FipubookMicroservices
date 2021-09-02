import {Message} from 'node-nats-streaming';
import {Subjects, Listener, PostUpdatedEvent, NotFoundError, BadRequestError} from "@fdfipubook/common";
import {Post} from "../../models/post";
import {queueGroupName} from "./queue-group-name";

export class PostUpdatedListener extends Listener<PostUpdatedEvent> {
    readonly subject = Subjects.PostUpdated;
    queueGroupName = queueGroupName;

    async onMessage(data: PostUpdatedEvent["data"], msg: Message) {
        const {id, postText, userId, version} = data;
        const post = await Post.findById(id);

        if (!post) {
            throw new NotFoundError();
        }

        if(userId!=post.userId) {
            throw new BadRequestError('This user cant edit this post')
        }

        post.set({
            postText: postText,
            version: version,
        })

        await post.save();

        msg.ack();
    }
}