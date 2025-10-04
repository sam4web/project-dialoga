import {
  ConversationRepository,
  IChatPartner,
  IConversationRepository,
  IMessageRepository,
  IUserProfile,
  IUserRepository,
  MessageRepository,
  UserRepository,
  IMessage,
  IImageMessage,
} from "../../database";
import { ApiError, bufferToDataURI } from "../../lib";
import { userService } from "../user";
import {
  IAddMessageInConversationDTO,
  IConversationContext,
  IConversationIdParamsDTO,
  ISendImageMessageDTO,
  ISendTextMessageDTO,
  IStartConversationDTO,
} from "./chat.types";

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

  private async addMessageInConversation({ conversation, message }: IAddMessageInConversationDTO) {
    try {
      await this.conversationRepository.updatePropertyById({
        conversationId: conversation._id,
        propertyName: "messages",
        value: [...conversation.messages, message],
      });
    } catch (err) {
      throw ApiError.internal("Failed to add message in conversation. Please try again.");
    }
  }

  private async getAuthorizedConversationContext({
    conversationId,
    userId,
  }: IConversationIdParamsDTO): Promise<IConversationContext> {
    const conversation = await this.conversationRepository.findById(conversationId);
    if (!conversation) {
      throw ApiError.notFound("Conversation not found. The requested chat session does not exist.");
    }
    if (!(conversation.user1._id.equals(userId) || conversation.user2._id.equals(userId))) {
      throw ApiError.forbidden("Unauthorized access. The user is not a participant in this conversation.");
    }
    const receiverId =
      conversation.user1._id.toString() === userId
        ? conversation.user2._id.toString()
        : conversation.user1._id.toString();
    if (userId === receiverId) {
      throw ApiError.forbidden("Cannot start a conversation with self. Please specify a different user.");
    }

    return { conversation, receiverId };
  }

  public async startNewConversation({
    userId,
    receiverId,
    initialMessage,
  }: IStartConversationDTO): Promise<IChatPartner> {
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
    return { ...userProfile, conversationId: newConversation._id } as IChatPartner;
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
      const messageDocument = (await this.messageRepository.findById(String(message))) as IMessage;
      if (messageDocument.type === "image") {
        messageDocument.image = bufferToDataURI(messageDocument.image as IImageMessage);
      }
      return messageDocument;
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

  public async sendTextMessage({ userId, conversationId, message: text }: ISendTextMessageDTO): Promise<IMessage> {
    const { conversation, receiverId } = await this.getAuthorizedConversationContext({ userId, conversationId });
    const message = await this.messageRepository.create({
      type: "text",
      receiverId,
      text,
      image: null,
    });
    this.addMessageInConversation({ conversation, message });
    return message;
  }

  public async sendImageMessage({ userId, conversationId, message: image }: ISendImageMessageDTO) {
    const { conversation, receiverId } = await this.getAuthorizedConversationContext({ userId, conversationId });
    const message = await this.messageRepository.create({
      type: "image",
      receiverId,
      text: null,
      image,
    });
    this.addMessageInConversation({ conversation, message: message });
    const imageDataUri = bufferToDataURI(message.image as IImageMessage);
    const { _id, receiverId: receiver, text, type, createdAt, updatedAt } = message;
    const responseMessage = { _id, receiverId: receiver, text, type, createdAt, updatedAt, image: imageDataUri };
    return responseMessage;
  }
}

const chatService = new ChatService();
export default chatService;
