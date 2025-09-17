import { model, Schema } from "mongoose";

export interface IMessage extends Document {
  _id: string;
  author: string;
  receiver: string;
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

const messageSchema = new Schema<IMessage>(
  {
    author: { type: String, required: true },
    receiver: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ["image", "text"], required: true },
  },
  { timestamps: true }
);

const Message = model<IMessage>("Message", messageSchema);

export default Message;
