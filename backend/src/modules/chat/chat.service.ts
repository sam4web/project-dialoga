import {
  ConversationRepository,
  IConversationRecipient,
  IConversationRepository,
  IMessageRepository,
  IUserProfile,
  IUserRepository,
  MessageRepository,
  UserRepository,
  IMessage,
} from "../../database";
import { ApiError } from "../../lib";
import { userService } from "../user";
import { IAddMessageInConversationDTO, IConversationIdParamsDTO, IStartConversationDTO } from "./chat.types";

class ChatService {
  private userRepository: IUserRepository;
  private conversationRepository: IConversationRepository;
  private messageRepository: IMessageRepository;

  constructor(
    userRepository: IUserRepository = new UserRepository(),
    conversationRepository: IConversationRepository = new ConversationRepository(),
    messageRepository: IMessageRepository = new MessageRepository()
  ) {
    this.userRepository = userRepository;
    this.conversationRepository = conversationRepository;
    this.messageRepository = messageRepository;
  }

  /*
  public async addMessageInConversation({
    conversationId,
    messageId,
  }: IAddMessageInConversationDTO): Promise<IConversation | null> {
    const conversation = await this.conversationRepository.findById(conversationId);
    if (!conversation) {
      throw ApiError.notFound("Conversation not found. The requested chat session does not exist.");
    }
    const message = await this.messageRepository.findById(messageId);
    if (!message) {
      throw ApiError.notFound("Message not found. The specific message ID could not be located.");
    }
    const updatedConversation = await this.conversationRepository.updatePropertyById({
      conversationId,
      propertyName: "messages",
      value: [...conversation.messages, message],
    });
    return updatedConversation;
  }
  */

  public async startNewConversation({
    userId,
    receiverId,
    initialMessage,
  }: IStartConversationDTO): Promise<IConversationRecipient> {
    if (userId === receiverId) {
      throw ApiError.forbidden("Cannot start a conversation with self. Please specify a different user.");
    }
    const receiver = await this.userRepository.findById(receiverId);
    if (!receiver) {
      throw ApiError.notFound("Receiver user not found. Cannot start a conversation with a nonexistent user.");
    }
    const conversation = await this.conversationRepository.find({ user1: userId, user2: receiverId });
    if (conversation) {
      throw ApiError.conflict("Conversation already exists. Please use the existing thread to send your message.");
    }
    const message = await this.messageRepository.create({
      type: "text",
      receiverId,
      text: initialMessage,
      image: null,
    });
    const newConversation = await this.conversationRepository.create({
      user1: userId,
      user2: receiverId,
      messages: [message],
    });
    //TODO: add connected user properties
    const userProfile = (await userService.getUserProfile(receiverId)) as IUserProfile;
    return { ...userProfile, conversationId: newConversation._id } as IConversationRecipient;
  }

  public async getConversationMessages({ userId, conversationId }: IConversationIdParamsDTO): Promise<IMessage[]> {
    const conversation = await this.conversationRepository.findById(conversationId);
    if (!conversation) {
      throw ApiError.notFound("Conversation not found. The requested chat session does not exist.");
    }
    if (!(conversation.user1._id.equals(userId) || conversation.user2._id.equals(userId))) {
      throw ApiError.forbidden("Unauthorized access. The user is not a participant in this conversation.");
    }
    const messagesListPromises = conversation.messages.map(async (message) => {
      return (await this.messageRepository.findById(String(message))) as IMessage;
    });
    const messages = await Promise.all(messagesListPromises);
    return messages;
  }

  public async getRecipientProfile({ userId, conversationId }: IConversationIdParamsDTO): Promise<IUserProfile> {
    const conversation = await this.conversationRepository.findById(conversationId);
    if (!conversation) {
      throw ApiError.notFound("Conversation not found. The requested chat session does not exist.");
    }
    if (!(conversation.user1._id.equals(userId) || conversation.user2._id.equals(userId))) {
      throw ApiError.forbidden("Unauthorized access. The user is not a participant in this conversation.");
    }
    const recipientId =
      conversation.user1._id.toString() === userId
        ? conversation.user2._id.toString()
        : conversation.user1._id.toString();
    const userProfile = await userService.getUserProfile(recipientId);
    if (!userProfile) {
      throw ApiError.notFound("User profile not found. The provided ID does not match any existing user.");
    }
    return userProfile;
  }
}

const chatService = new ChatService();
export default chatService;
