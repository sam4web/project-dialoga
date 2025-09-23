import ApiError from "../../lib/errors/ApiError";
import Message from "../models/Message";
import { ICreateMessageDTO, IMessage } from "../types/MessageTypes";

export interface IMessageRepository {
  create(messageData: ICreateMessageDTO): Promise<IMessage>;
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
}
