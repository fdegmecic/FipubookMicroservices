import mongoose from 'mongoose';

interface UserAttributes {
    id:string;
    name: string;
    avatar:string;
}

interface UserDocument extends mongoose.Document {
    name: string;
    avatar:string;
}

interface UserModel extends mongoose.Model<UserDocument> {
    build(attributes: UserAttributes): UserDocument;
}


const userSchema = new mongoose.Schema<UserDocument>({
    name: {
        type: String,
        required: true,
    },
    avatar: {
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


userSchema.statics.build = (attributes: UserAttributes) => {
    return new User({
        _id:attributes.id,
        name:attributes.name,
        avatar:attributes.avatar,
    });
}

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export {User}