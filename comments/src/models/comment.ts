import mongoose from "mongoose";
import {PostDocument} from "./post";

interface CommentAttributes {
    commentText: string;
    post: PostDocument;
    userId: string;
    created: Date;
}

interface CommentDocument extends mongoose.Document {
    commentText: string;
    post: PostDocument;
    userId: string;
    created: Date;
}

interface CommentModel extends mongoose.Model<CommentDocument> {
    build(attributes: CommentAttributes): CommentDocument;
}

const commentSchema = new mongoose.Schema({
    commentText: {
        type: String,
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    userId: {
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

commentSchema.statics.build = (attributes: CommentAttributes) => {
    return new Comment(attributes);
}

// @ts-ignore
const Comment = mongoose.model<CommentDocument, CommentModel>('Comment', commentSchema);

export {Comment}