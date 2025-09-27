import UserRepository, { IUserRepository } from "../../database/repositories/UserRepository";
import ConversationRepository, { IConversationRepository } from "../../database/repositories/ConversationRepository";
import { IConversation } from "../../database/types/ConversationTypes";

class ChatService {
  private userRepository: IUserRepository;
  private conversationRepository: IConversationRepository;

  constructor(
    userRepository: IUserRepository = new UserRepository(),
    conversationRepository: IConversationRepository = new ConversationRepository()
  ) {
    this.userRepository = userRepository;
    this.conversationRepository = conversationRepository;
  }

  public async startNewConversation(userId: string, receiverId: string): Promise<IConversation> {
    const conversation = await this.conversationRepository.findConversation(userId, receiverId);
    if (conversation) {
      return conversation;
    }
    const newConversation = await this.conversationRepository.createConversation(userId, receiverId);
    return newConversation;
  }
}

const chatService = new ChatService();
export default chatService;
