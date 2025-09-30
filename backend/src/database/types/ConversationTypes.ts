import mongoose from "mongoose";
import { IMessage } from ".";

export interface IConversation extends Document {
  user1: mongoose.Types.ObjectId;
  user2: mongoose.Types.ObjectId;
  messages: IMessage[];
}
