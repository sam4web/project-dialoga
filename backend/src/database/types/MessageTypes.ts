import mongoose from "mongoose";
import { IMessage as IMessageSchema, IImageFIle } from "../../../../shared/types";

export interface IMessage extends Omit<IMessageSchema, "receiverId" | "image">, Document {
  receiverId: mongoose.Types.ObjectId;
  image: IImageMessage | string | null;
}

export interface IImageMessage extends IImageFIle {}

export interface ICreateMessageDTO {
  receiverId: string;
  text: string | null;
  image: IImageMessage | null;
  type: "image" | "text";
}
