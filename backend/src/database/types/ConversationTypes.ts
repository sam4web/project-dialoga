import { IMessage } from "./MessageTypes";
import { IUserWithoutPassword } from "./UserTypes";

export interface IConversation extends Document {
  user1: IUserWithoutPassword;
  user2: IUserWithoutPassword;
  messages: IMessage[];
}
