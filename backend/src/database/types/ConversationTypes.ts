import mongoose from "mongoose";
import { IMessage } from "./MessageTypes";

export interface IConversation {
  _id: string;
  user1: mongoose.Types.ObjectId;
  user2: mongoose.Types.ObjectId;
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateConversationDTO {
  user1: string;
  user2: string;
  messages: IMessage[];
}

export interface IUpdatePropertyByIdDTO {
  conversationId: string;
  propertyName: keyof IConversation;
  value: IConversation[keyof IConversation] | string;
}

export interface IFindConversationDTO {
  user1: string;
  user2: string;
}
