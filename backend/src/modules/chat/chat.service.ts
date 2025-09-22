import UserRepository, { IUserRepository } from "../../database/repositories/UserRepository";

class ChatService {
  private userRepository: IUserRepository;
  constructor(userRepository: IUserRepository = new UserRepository()) {
    this.userRepository = userRepository;
  }
}

const chatService = new ChatService();
export default chatService;
