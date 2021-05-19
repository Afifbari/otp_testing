import * as mongoose from 'mongoose';

export const OtpLogSchema = new mongoose.Schema({
  phone: {
      type: String,
      required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  verification_status: {
    type: String,
    default: 'unverified',
  },
  expireDate: {
      type: String,
      default: null,
  }
},{ timestamps: true });


export interface OtpLog extends mongoose.Document {
  readonly _id: mongoose.Schema.Types.ObjectId;
  readonly phone: string;
  readonly otp: string;
  readonly expireDate: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}