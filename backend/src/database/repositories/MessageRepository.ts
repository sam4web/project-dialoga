import { ApiError } from "../../lib";
import { Message } from "../models";
import { ICreateMessageDTO, IMessage } from "../types";

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
