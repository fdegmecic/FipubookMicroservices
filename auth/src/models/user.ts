import mongoose from 'mongoose';
import {Password} from "../utils/password";

interface UserAttributes {
    email: string;
    password: string;
    name: string;
    avatar: string;
}

interface UserDocument extends mongoose.Document {
    email: string;
    password: string;
    name: string;
    avatar: string;
}

interface UserModel extends mongoose.Model<UserDocument> {
    build(attributes: UserAttributes): UserDocument;
}


const userSchema = new mongoose.Schema<UserDocument>({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
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
            delete ret.password;
            delete ret.__v;
        }
    }
})

userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
})

userSchema.statics.build = (attributes: UserAttributes) => {
    return new User(attributes);
}

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export {User}