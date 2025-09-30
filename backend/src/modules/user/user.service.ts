import ConversationRepository, { IConversationRepository } from "../../database/repositories/ConversationRepository";
import ProfileImageRepository, { IProfileImageRepository } from "../../database/repositories/ProfileImageRepository";
import UserRepository, { IUserRepository } from "../../database/repositories/UserRepository";
import { IProfileImage } from "../../database/types/ProfileImageTypes";
import { IUpdateUserDTO, IUserProfile } from "../../database/types/UserTypes";
import ApiError from "../../lib/errors/ApiError";
import { getProfileImageDataUri } from "./user.helpers";
import { IConnectedUser } from "./user.types";

class UserService {
  private userRepository: IUserRepository;
  private conversationRepository: IConversationRepository;
  private profileImageRepository: IProfileImageRepository;

  constructor(
    userRepository: IUserRepository = new UserRepository(),
    conversationRepository: IConversationRepository = new ConversationRepository(),
    profileImageRepository: IProfileImageRepository = new ProfileImageRepository()
  ) {
    this.userRepository = userRepository;
    this.conversationRepository = conversationRepository;
    this.profileImageRepository = profileImageRepository;
  }

  public async getAllUsers(userId: string) {
    const usersPromises = (await this.userRepository.getAll())
      .filter((u) => u._id != userId)
      .map(async (user) => {
        let { _id, fullname, email, statusMessage, profileImage } = user;
        if (user.profileImage) {
          profileImage = await getProfileImageDataUri(String(user.profileImage));
        }
        return { _id, fullname, email, statusMessage, profileImage } as IUserProfile;
      });
    const users = await Promise.all(usersPromises);
    return users;
  }

  public async getUnconnectedUsers(userId: string): Promise<IUserProfile[]> {
    const users = (await this.userRepository.getAll()).filter((u) => u._id != userId);
    const conversations = await this.conversationRepository.getAllConversation(userId);
    const connectedParticipantIds: string[] = conversations.map((conv) => {
      return conv.user1._id.toString() === userId ? conv.user2._id.toString() : conv.user1._id.toString();
    });
    const participantPromises = users
      .filter((user) => !connectedParticipantIds.includes(user._id.toString()))
      .map(async (user) => {
        let { _id, fullname, email, statusMessage, profileImage } = user;
        if (user.profileImage) {
          profileImage = await getProfileImageDataUri(String(user.profileImage));
        }
        return { _id, fullname, email, statusMessage, profileImage } as IUserProfile;
      });

    const unconnectedUsers = await Promise.all(participantPromises);
    return unconnectedUsers;
  }

  public async getConnectedUsers(userId: string): Promise<IConnectedUser[]> {
    const conversations = await this.conversationRepository.getAllConversation(userId);
    const participantIds: string[] = conversations.map((conv) => {
      return conv.user1._id.toString() === userId ? conv.user2._id.toString() : conv.user1._id.toString();
    });
    const participantPromises = participantIds.map(async (participantId) => {
      const user = (await this.userRepository.findById(participantId))!;
      let { _id, fullname, email, statusMessage, profileImage } = user;
      if (user.profileImage) {
        profileImage = await getProfileImageDataUri(String(user.profileImage));
      }
      // TODO: include isOnline, lastSeen, lastMessage properties
      return { _id, fullname, email, statusMessage, profileImage } as IConnectedUser;
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
    if (user.profileImage) {
      user.profileImage = await getProfileImageDataUri(String(user.profileImage));
    }
    const { password, createdAt, updatedAt, ...userWithoutPassword } = user;
    return userWithoutPassword as IUserProfile;
  }

  public async updateUserProfile(userId: string, updateData: IUpdateUserDTO) {
    const updatedUser = await this.userRepository.update(userId, { ...updateData });
    if (!updatedUser) {
      throw ApiError.unauthorized("Profile update failed. Could not verify your identity. Please log in again.");
    }
    if (updatedUser.profileImage) {
      updatedUser.profileImage = await getProfileImageDataUri(String(updatedUser.profileImage));
    }
    const { password, createdAt, updatedAt, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword as IUserProfile;
  }

  public async updateUserProfileImage(userId: string, imageData: IProfileImage) {
    const user = (await this.userRepository.findById(userId))!;
    let profileImage: IProfileImage | null = null;
    if (!user.profileImage) {
      profileImage = (await this.profileImageRepository.create(imageData)) as IProfileImage;
      await this.userRepository.update(userId, { profileImage: profileImage._id });
    } else {
      profileImage = (await this.profileImageRepository.update(String(user.profileImage), imageData)) as IProfileImage;
    }
    user.profileImage = await getProfileImageDataUri(String(profileImage._id));
    const { password, createdAt, updatedAt, ...userWithoutPassword } = user;
    return userWithoutPassword as IUserProfile;
  }
}

const userService = new UserService();
export default userService;
