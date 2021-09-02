import mongoose from "mongoose";
import {PostDocument} from "./post";

interface PostLikeAttribute {
    post: PostDocument;
    userId: string;
}

export interface PostLikeDocument extends mongoose.Document {
    post: PostDocument;
    userId: string;
}

interface PostLikeModel extends mongoose.Model<PostLikeDocument> {
    build(attributes: PostLikeAttribute): PostLikeDocument;
}

const postLikeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Post',
    },
    userId: {
        type: String,
        required: false,
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

postLikeSchema.statics.build = (attributes: PostLikeAttribute) => {
    return new PostLike(attributes);
}

// @ts-ignore
const PostLike = mongoose.model<PostLikeDocument, PostLikeModel>('PostLike', postLikeSchema);

export {PostLike}