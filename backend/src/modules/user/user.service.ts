import ConversationRepository, { IConversationRepository } from "../../database/repositories/ConversationRepository";
import UserRepository, { IUserRepository } from "../../database/repositories/UserRepository";
import { IUpdateUserDTO, TUserWithoutPassword } from "../../database/types/UserTypes";
import ApiError from "../../lib/errors/ApiError";

class UserService {
  private userRepository: IUserRepository;
  private conversationRepository: IConversationRepository;

  constructor(
    userRepository: IUserRepository = new UserRepository(),
    conversationRepository: IConversationRepository = new ConversationRepository()
  ) {
    this.userRepository = userRepository;
    this.conversationRepository = conversationRepository;
  }

  public async getAllUsers(userId: string) {
    return (await this.userRepository.getAll()).filter((u) => u.id != userId);
  }

  public async getNewChatCandidates(userId: string) {
    const users = (await this.userRepository.getAll()).filter((u) => u._id != userId);
    const activeConversations = await this.conversationRepository.getAllConversation(userId);
    const activeConversationIds: string[] = activeConversations.map((conv) => {
      return conv.user1._id.toString() === userId ? conv.user2._id.toString() : conv.user1._id.toString();
    });

    const newContacts = users
      .filter((user) => !activeConversationIds.includes(user._id.toString()))
      .map((user) => {
        return {
          _id: user._id,
          fullname: user.fullname,
          profileImage: user.profileImage,
        };
      });
    return newContacts;
  }

  public async getUserProfile(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw ApiError.unauthorized(
        "Failed to get profile. Either an invalid token was provided, or the user does not exist."
      );
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as TUserWithoutPassword;
  }

  public async updateUserProfile(userId: string, updateData: IUpdateUserDTO) {
    const updatedUser = await this.userRepository.update(userId, { ...updateData });
    if (!updatedUser) {
      throw ApiError.unauthorized("Profile update failed. Could not verify your identity. Please log in again.");
    }
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword as TUserWithoutPassword;
  }
}

const userService = new UserService();
export default userService;
