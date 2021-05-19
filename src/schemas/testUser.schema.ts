import * as mongoose from 'mongoose';

export const TestUserSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    }
}, { timestamps: true });


export interface TestUser extends mongoose.Document {
    readonly _id: mongoose.Schema.Types.ObjectId;
    readonly phone: string;
    readonly otp: string;
    readonly createdAt: string;
    readonly updatedAt: string;
}