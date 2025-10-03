import mongoose from "mongoose";
import { IConversation as IConversationSchema } from "../../../../shared/types/chat";
import { IMessage } from "./MessageTypes";
export * from "../../../../shared/types/chat";

export interface IConversation extends Omit<IConversationSchema, "user1" | "user2" | "messages">, Document {
  user1: mongoose.Types.ObjectId;
  user2: mongoose.Types.ObjectId;
  messages: IMessage[];
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
