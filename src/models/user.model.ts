import mongoose, { Model, Schema, Document, model } from 'mongoose';
import Gender from '../enums/gender';

export interface Address extends Document {
    street: string;
    city: string;
    postCode: string;
}

type UserDocument = Document & {
    email: string;
    firstName: string;
    lastName: string;
    gender?: Gender;
    address?: Address;
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, enum: Object.values(Gender) },
    address: {
        street: { type: String },
        city: { type: String },
        postCode: { type: String }
    }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: "updatedAt"
    }
});

const User: Model<UserDocument> = model<UserDocument>("User", UserSchema);

export { User, UserDocument }