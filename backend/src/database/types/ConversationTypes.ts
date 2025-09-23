import { IMessage } from "./MessageTypes";
import { TUserWithoutPassword } from "./UserTypes";

export interface IConversation extends Document {
  user1: TUserWithoutPassword;
  user2: TUserWithoutPassword;
  messages: IMessage[];
}
