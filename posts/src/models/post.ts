import mongoose from "mongoose";
import {updateIfCurrentPlugin} from "mongoose-update-if-current";

interface PostAttributes {
    postText: string;
    postUrl?: string;
    userId: string;
    userName: string;
    userAvatar: string;
    created: Date,
}

interface PostDocument extends mongoose.Document {
    postText: string;
    postUrl?: string;
    userId: string;
    userName: string;
    userAvatar: string;
    created: Date,
    version: number,
}

interface PostModel extends mongoose.Model<PostDocument> {
    build(attributes: PostAttributes): PostDocument;
}

const postSchema = new mongoose.Schema({
    postText: {
        type: String,
        required: true
    },
    postUrl: {
        type: String,
        required: false,
    },
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
        required: true,
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
    return new Post(attributes);
}

// @ts-ignore
const Post = mongoose.model<PostDocument, PostModel>('Post', postSchema);

export {Post}