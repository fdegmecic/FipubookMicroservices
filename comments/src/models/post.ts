import mongoose from "mongoose";

interface PostAttributes {
    id: string;
    postText: string;
    userId: string;
}

export interface PostDocument extends mongoose.Document {
    postText: string;
    userId: string;
}

interface PostModel extends mongoose.Model<PostDocument> {
    build(attributes: PostAttributes): PostDocument;
}

const postSchema = new mongoose.Schema({
    postText: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

postSchema.statics.build=(attributes: PostAttributes) => {
    return new Post({
        _id:attributes.id,
        postText:attributes.postText,
        userId:attributes.userId,
    });
}

// @ts-ignore
const Post = mongoose.model<PostDocument, PostModel>('Post', postSchema);

export {Post}