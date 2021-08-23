import mongoose from "mongoose";
import {updateIfCurrentPlugin} from "mongoose-update-if-current";

interface PostAttributes {
    id: string;
    postText: string;
    userId: string;
    created:Date;
    version:number;
}

export interface PostDocument extends mongoose.Document {
    postText: string;
    userId: string;
    created:Date;
    version:number;
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

postSchema.statics.build=(attributes: PostAttributes) => {
    return new Post({
        _id:attributes.id,
        postText:attributes.postText,
        userId:attributes.userId,
        version:attributes.version,
    });
}

// @ts-ignore
const Post = mongoose.model<PostDocument, PostModel>('Post', postSchema);

export {Post}