import mongoose from 'mongoose';
import { Schema,model,models } from 'mongoose';

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for this user.'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email for this user.'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password for this user.'],
    },
}, { timestamps: true })

const postModel = models.User || model('User', UserSchema);

export default postModel;
