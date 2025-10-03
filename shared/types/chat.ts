import { IMessage } from "./message";

export interface IConversation {
  _id: string;
  user1: string;
  user2: string;
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IStartConversationRequestDTO {
  receiverId: string;
  initialMessage: string;
}
