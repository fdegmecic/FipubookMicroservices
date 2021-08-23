import mongoose from 'mongoose';

interface FollowerAttributes {
    followeeId: string;
    followerId: string;
}

interface FollowerDocument extends mongoose.Document {
    followeeId: string;
    followerId: string;
}

interface FollowerModel extends mongoose.Model<FollowerDocument> {
    build(attributes: FollowerAttributes): FollowerDocument;
}

const followerSchema = new mongoose.Schema<FollowerDocument>({
    followeeId: {
        type: String,
        required: true,
    },
    followerId: {
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