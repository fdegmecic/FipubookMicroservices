import mongoose from 'mongoose';

interface FollowerAttributes {
    followerId: string;
    followingId: string;
}

interface FollowerDocument extends mongoose.Document {
    followerId: string;
    followingId: string;
}

interface FollowerModel extends mongoose.Model<FollowerDocument> {
    build(attributes: FollowerAttributes): FollowerDocument;
}

const followerSchema = new mongoose.Schema<FollowerDocument>({
    followerId: {
        type: String,
        required: true,
    },
    followingId: {
        type: String,
        required: true,
    },
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
    return new Follower({attributes});
}

const Follower = mongoose.model<FollowerDocument, FollowerModel>('Follower', followerSchema);

export {Follower}
