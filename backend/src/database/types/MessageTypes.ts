import mongoose from "mongoose";

export interface IImageMessage {
  _id: string;
  name: string;
  data: Buffer;
  contentType: string;
}

export interface IMessage {
  _id: string;
  receiverId: mongoose.Types.ObjectId;
  text: string | null;
  image: IImageMessage | null;
  type: "image" | "text";
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateMessageDTO {
  receiverId: string;
  text: string | null;
  image: IImageMessage | null;
  type: "image" | "text";
}
