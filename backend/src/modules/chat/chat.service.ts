import {
  ConversationRepository,
  IConnectedUser,
  IConversation,
  IConversationRepository,
  IMessageRepository,
  IUserRepository,
  MessageRepository,
  UserRepository,
} from "../../database";
import { ApiError } from "../../lib";
import { userService } from "../user";
import { IAddMessageInConversationDTO, IStartConversationDTO } from "./chat.types";

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

  public async startNewConversation({
    userId,
    receiverId,
    initialMessage,
  }: IStartConversationDTO): Promise<IConnectedUser> {
    if (userId === receiverId) {
      throw ApiError.forbidden("Cannot start a conversation with yourself. Please specify a different user.");
    }
    const receiver = await this.userRepository.findById(receiverId);
    if (!receiver) {
      throw ApiError.notFound("Receiver user not found. Cannot start a conversation with a nonexistent user.");
    }
    const conversation = await this.conversationRepository.find({ user1: userId, user2: receiverId });
    if (conversation) {
      throw ApiError.conflict(
        "A conversation already exists between the specified users. Use the existing conversation to send a message."
      );
    }
    const message = await this.messageRepository.create({
      type: "text",
      receiverId,
      text: initialMessage,
      image: null,
    });
    await this.conversationRepository.create({
      user1: userId,
      user2: receiverId,
      messages: [message],
    });
    // TODO: add connected user properties
    const userProfile = (await userService.getUserProfile(receiverId)) as IConnectedUser;
    return userProfile;
  }
}

const chatService = new ChatService();
export default chatService;
