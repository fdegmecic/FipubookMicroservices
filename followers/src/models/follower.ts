import mongoose from 'mongoose';

interface FollowerAttributes {
    followerId: string;
    followerName: string;
    followerAvatar: string;
    followingId: string;
    followingName: string;
    followingAvatar: string;
}

interface FollowerDocument extends mongoose.Document {
    followerId: string;
    followerName: string;
    followerAvatar: string;
    followingId: string;
    followingName: string;
    followingAvatar: string;
}

interface FollowerModel extends mongoose.Model<FollowerDocument> {
    build(attributes: FollowerAttributes): FollowerDocument;
}

const followerSchema = new mongoose.Schema<FollowerDocument>({
    followerId: {
        type: String,
        required: true,
    },
    followerName: {
        type: String,
        required: true,
    },
    followerAvatar: {
        type: String,
        required: true,
    },
    followingId: {
        type: String,
        required: true,
    },
    followingName: {
        type: String,
        required: true,
    },
    followingAvatar: {
        type: String,
        required: true,
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
})


followerSchema.statics.build = (attributes: FollowerAttributes) => {
    return new Follower(attributes);
}

const Follower = mongoose.model<FollowerDocument, FollowerModel>('Follower', followerSchema);

export {Follower}