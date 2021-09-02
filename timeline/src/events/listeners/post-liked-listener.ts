import {Message} from 'node-nats-streaming';
import {Subjects, Listener, PostLikedEvent, NotFoundError} from "@fdfipubook/common";
import {Post} from "../../models/post";
import {queueGroupName} from "./queue-group-name";
import {PostLike} from "../../models/postLike";

export class PostLikedListener extends Listener<PostLikedEvent> {
    readonly subject = Subjects.PostLiked;
    queueGroupName = queueGroupName;

    async onMessage(data: PostLikedEvent["data"], msg: Message) {
        const {postId, userId} = data;

        const post = await Post.findById(postId)

        if (!post) {
            throw new NotFoundError();
        }

        const postLike = PostLike.build({
            post: post,
            userId: userId,
        })
        await postLike.save();

        await Post.findByIdAndUpdate(postId, {$push: {postLikes: postLike}}, {
            new: true,
            useFindAndModify: false
        }).populate('postLikes');

        msg.ack();
    }
}