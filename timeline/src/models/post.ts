import mongoose from "mongoose";
import {updateIfCurrentPlugin} from "mongoose-update-if-current";
import {PostLikeDocument} from "./postLike";

interface PostAttributes {
    id: string;
    postText: string;
    postImage?: string;
    postLikes?: PostLikeDocument;
    userId: string;
    userName: string;
    userAvatar: string;
    created: Date;
    version: number;
}

export interface PostDocument extends mongoose.Document {
    postText: string;
    postImage?: string;
    postLikes?: PostLikeDocument;
    userId: string;
    userName: string;
    userAvatar: string;
    created: Date;
    version: number;
}

interface PostModel extends mongoose.Model<PostDocument> {
    build(attributes: PostAttributes): PostDocument;
}

const postSchema = new mongoose.Schema({
    postText: {
        type: String,
        required: true
    },
    postImage: {
        type: String,
        required: false
    },
    postLikes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PostLike',
        required:false,
    }],
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userAvatar: {
        type: String,
        required: true
    },
    created: {
        type: mongoose.Schema.Types.Date
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

postSchema.set('versionKey', 'version')
postSchema.plugin(updateIfCurrentPlugin);

postSchema.statics.build = (attributes: PostAttributes) => {
    return new Post({
        _id: attributes.id,
        postText: attributes.postText,
        postImage: attributes.postImage,
        postLikes: attributes.postLikes,
        userId: attributes.userId,
        userName: attributes.userName,
        userAvatar: attributes.userAvatar,
        created: attributes.created,
        version: attributes.version,
    });
}

// @ts-ignore
const Post = mongoose.model<PostDocument, PostModel>('Post', postSchema);

export {Post}