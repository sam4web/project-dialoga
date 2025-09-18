import ApiError from "../../lib/errors/ApiError";
import Message from "../models/Message";
import { ICreateMessageDTO, IMessage } from "../types/MessageTypes";

export interface IMessageRepository {
  create(messageData: ICreateMessageDTO): Promise<IMessage>;
  findConversation(userId1: string, userId2: string): Promise<IMessage[]>;
}

export default class MessageRepository implements IMessageRepository {
  public async create(messageData: ICreateMessageDTO): Promise<IMessage> {
    try {
      const newMessage = await Message.create(messageData);
      return newMessage;
    } catch (error) {
      throw ApiError.internal("Failed to create message.");
    }
  }

  public async findConversation(userId1: string, userId2: string): Promise<IMessage[]> {
    try {
      const messages = await Message.find({
        $or: [
          { sender: userId1, receiver: userId2 },
          { sender: userId2, receiver: userId1 },
        ],
      });
      return messages;
    } catch (error) {
      throw ApiError.internal("Failed to create message.");
    }
  }
}
