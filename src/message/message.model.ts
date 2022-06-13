import * as mongoose from 'mongoose';

export interface IMessage {
  id: string;
  msg: string;
  sender: mongoose.ObjectId;
  isToxic: boolean;
}

export const MessageSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    msg: { type: String, required: true },
    sender: { type: mongoose.Types.ObjectId, required: true },
    isToxic: { type: Boolean, required: false, default: false },
  },
  {
    timestamps: true,
  },
);
