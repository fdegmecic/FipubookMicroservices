import {Message} from 'node-nats-streaming';
import {Subjects, Listener, NotFoundError, PostUnlikedEvent, BadRequestError} from "@fdfipubook/common";
import {Post} from "../../models/post";
import {queueGroupName} from "./queue-group-name";
import {PostLike} from "../../models/postLike";

export class PostUnlikedListener extends Listener<PostUnlikedEvent> {
    readonly subject = Subjects.PostUnliked;
    queueGroupName = queueGroupName;

    async onMessage(data: PostUnlikedEvent["data"], msg: Message) {
        const {postId, userId} = data;

        const post = await Post.findById(postId)

        if (!post) {
            throw new NotFoundError();
        }

        const existingPostLike = await PostLike.findOne({userId: userId, post: post});

        if (!existingPostLike) {
            throw new BadRequestError('Cannot unlike this post')
        }

        const {_id: postLikeId} = existingPostLike;

        await Post.findByIdAndUpdate(postId, {
            $pull: {
                postLikes: {_id: postLikeId, userId: userId}
            }
        }, {
            new: true,
            useFindAndModify: false
        });
        await Post.updateOne({})
        await PostLike.findByIdAndDelete(postLikeId);

        msg.ack();
    }
}