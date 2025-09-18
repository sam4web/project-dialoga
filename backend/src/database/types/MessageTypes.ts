import { Document, Schema } from "mongoose";

export interface IMessage extends Document {
  _id: string;
  author: Schema.Types.ObjectId;
  receiver: Schema.Types.ObjectId;
  message: string;
  type: "image" | "text";
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateMessageDTO {
  author: string;
  receiver: string;
  message: string;
  type: "image" | "text";
}
