import mongoose from "mongoose";
import { IMessage as IMessageSchema } from "../../../../shared/types/message";

export interface IMessage extends Omit<IMessageSchema, "receiverId" | "image">, Document {
  receiverId: mongoose.Types.ObjectId;
  image: IImageMessage | null;
}

export interface IImageMessage {
  _id: string;
  name: string;
  data: Buffer;
  contentType: string;
}

export interface ICreateMessageDTO {
  receiverId: string;
  text: string | null;
  image: IImageMessage | null;
  type: "image" | "text";
}
