import ConversationRepository, { IConversationRepository } from "../../database/repositories/ConversationRepository";
import UserRepository, { IUserRepository } from "../../database/repositories/UserRepository";
import { IUpdateUserDTO, IUser, TUserWithoutPassword } from "../../database/types/UserTypes";
import ApiError from "../../lib/errors/ApiError";
import { IContact } from "./user.types";

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

  public async getUnconnectedUsers(userId: string): Promise<IContact[]> {
    const users = (await this.userRepository.getAll()).filter((u) => u._id != userId);
    const conversations = await this.conversationRepository.getAllConversation(userId);
    const connectedParticipantIds: string[] = conversations.map((conv) => {
      return conv.user1._id.toString() === userId ? conv.user2._id.toString() : conv.user1._id.toString();
    });
    const unconnectedUsers = users
      .filter((user) => !connectedParticipantIds.includes(user._id.toString()))
      .map((user) => {
        const { _id, profileImage, fullname, email, statusMessage } = user;
        return { _id, profileImage, fullname, email, statusMessage } as IContact;
      });
    return unconnectedUsers;
  }

  public async getConnectedUsers(userId: string): Promise<IContact[]> {
    const conversations = await this.conversationRepository.getAllConversation(userId);
    const participantIds: string[] = conversations.map((conv) => {
      return conv.user1._id.toString() === userId ? conv.user2._id.toString() : conv.user1._id.toString();
    });
    const participantPromises = participantIds.map(async (participantId) => {
      const user = (await this.userRepository.findById(participantId)) as IUser;
      const { _id, profileImage, fullname, email, statusMessage } = user;
      return { _id, profileImage, fullname, email, statusMessage } as IContact;
    });
    const activeParticipants = await Promise.all(participantPromises);
    return activeParticipants;
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
