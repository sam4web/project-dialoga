import { ApiError } from "../../lib";
import { Message } from "../models";
import { ICreateMessageDTO, IMessage } from "../types";

export interface IMessageRepository {
  create(messageData: ICreateMessageDTO): Promise<IMessage>;
  findById(id: string): Promise<IMessage | null>;
  findByReceiverId(receiverId: string): Promise<IMessage | null>;
}

export default class MessageRepository implements IMessageRepository {
  public async findById(id: string): Promise<IMessage | null> {
    try {
      const message = await Message.findById(id).select("-__v").lean();
      return message as IMessage | null;
    } catch (error) {
      throw ApiError.internal("Failed to find message.");
    }
  }

  public async findByReceiverId(receiverId: string): Promise<IMessage | null> {
    try {
      const message = await Message.findOne({ receiverId }).select("-__v").lean();
      return message as IMessage | null;
    } catch (error) {
      throw ApiError.internal("Failed to find message.");
    }
  }

  public async create(messageData: ICreateMessageDTO): Promise<IMessage> {
    try {
      const newMessage = await Message.create(messageData);
      return newMessage;
    } catch (error) {
      throw ApiError.internal("Failed to create message.");
    }
  }
}
