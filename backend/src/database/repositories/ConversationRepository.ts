import { ApiError } from "../../lib";
import { Conversation } from "../models";
import { IConversation } from "../types";

export interface IConversationRepository {
  findConversation(userId1: string, userId2: string): Promise<IConversation | null>;
  createConversation(userId1: string, userId2: string): Promise<IConversation>;
  getAllConversation(userId: string): Promise<IConversation[]>;
}

export default class ConversationRepository implements IConversationRepository {
  public async findConversation(userId1: string, userId2: string): Promise<IConversation | null> {
    try {
      const conversation = await Conversation.findOne({
        $or: [
          { user1: userId1, user2: userId2 },
          { user1: userId2, user2: userId1 },
        ],
      })
        .select("-__v")
        .lean();
      return conversation || null;
    } catch (error) {
      throw ApiError.internal("Failed to find conversation.");
    }
  }

  public async getAllConversation(userId: string): Promise<IConversation[]> {
    try {
      const conversations = await Conversation.find({
        $or: [{ user1: userId }, { user2: userId }],
      })
        .select("-__v")
        .lean();
      return conversations;
    } catch (error) {
      throw ApiError.internal("Failed to get all conversation.");
    }
  }

  public async createConversation(userId1: string, userId2: string): Promise<IConversation> {
    try {
      await Conversation.create({ user1: userId1, user2: userId2, messages: [] });
      const newConversation = (await this.findConversation(userId1, userId2)) as IConversation;
      return newConversation;
    } catch (error) {
      throw ApiError.internal("Failed to create conversation.");
    }
  }
}
