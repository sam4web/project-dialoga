import { ApiError } from "../../lib";
import { Conversation } from "../models";
import { IConversation, ICreateConversationDTO, IFindConversationDTO, IUpdatePropertyByIdDTO } from "../types";

export interface IConversationRepository {
  findById(conversationId: string): Promise<IConversation | null>;
  find({ user1, user2 }: IFindConversationDTO): Promise<IConversation | null>;
  getAll(userId: string): Promise<IConversation[]>;
  create({ user1, user2, messages }: ICreateConversationDTO): Promise<IConversation>;
  updatePropertyById({ conversationId, propertyName, value }: IUpdatePropertyByIdDTO): Promise<IConversation>;
}

export default class ConversationRepository implements IConversationRepository {
  public async findById(conversationId: string): Promise<IConversation | null> {
    try {
      const conversation = await Conversation.findById(conversationId);
      return (conversation as IConversation) || null;
    } catch (error) {
      throw ApiError.internal("Failed to find conversation.");
    }
  }

  public async find({ user1: userId1, user2: userId2 }: IFindConversationDTO): Promise<IConversation | null> {
    try {
      const conversation = await Conversation.findOne({
        $or: [
          { user1: userId1, user2: userId2 },
          { user1: userId2, user2: userId1 },
        ],
      })
        .select("-__v")
        .lean();
      return (conversation as IConversation) || null;
    } catch (error) {
      throw ApiError.internal("Failed to find conversation.");
    }
  }

  public async getAll(userId: string): Promise<IConversation[]> {
    try {
      const conversations = await Conversation.find({
        $or: [{ user1: userId }, { user2: userId }],
      })
        .select("-__v")
        .lean();
      return conversations as IConversation[];
    } catch (error) {
      throw ApiError.internal("Failed to get all conversation.");
    }
  }

  public async create({ user1, user2, messages }: ICreateConversationDTO): Promise<IConversation> {
    try {
      const newConversation = await Conversation.create({ user1, user2, messages });
      return newConversation;
    } catch (error) {
      throw ApiError.internal("Failed to create conversation.");
    }
  }
  public async updatePropertyById({
    conversationId,
    propertyName,
    value,
  }: IUpdatePropertyByIdDTO): Promise<IConversation> {
    try {
      const conversation = (await Conversation.findByIdAndUpdate(
        conversationId,
        { [propertyName]: value },
        { new: true }
      )) as IConversation;
      return conversation;
    } catch (error) {
      throw ApiError.internal("Failed to update conversation.");
    }
  }
}
