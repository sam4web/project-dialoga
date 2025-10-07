import {
  ConversationRepository,
  IChatPartner,
  IConversationRepository,
  IMessageRepository,
  IProfileImage,
  IProfileImageRepository,
  IUpdateUserDTO,
  IUserProfile,
  IUserRepository,
  MessageRepository,
  ProfileImageRepository,
  UserRepository,
} from "../../database";
import { ApiError } from "../../lib";
import { getProfileImageDataUri } from "./user.helpers";
import { broadcastUserUpdate } from "./user.socket";
import { ISetOnlineStatus } from "./user.types";

class UserService {
  private userRepository: IUserRepository;
  private conversationRepository: IConversationRepository;
  private profileImageRepository: IProfileImageRepository;
  private messageRepository: IMessageRepository;

  constructor(
    userRepository: IUserRepository = new UserRepository(),
    conversationRepository: IConversationRepository = new ConversationRepository(),
    messageRepository: IMessageRepository = new MessageRepository(),
    profileImageRepository: IProfileImageRepository = new ProfileImageRepository()
  ) {
    this.userRepository = userRepository;
    this.conversationRepository = conversationRepository;
    this.messageRepository = messageRepository;
    this.profileImageRepository = profileImageRepository;
  }

  private async getLastMessageInConversation(conversationId: string) {
    const conversation = (await this.conversationRepository.findById(conversationId))!;
    const message = (await this.messageRepository.findById(conversation.messages.slice(-1).toString()))!;
    return message.type === "text" ? message.text : "Image";
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

  public async getUnassociatedUsers(userId: string): Promise<IUserProfile[]> {
    const users = (await this.userRepository.getAll()).filter((u) => u._id != userId);
    const conversations = await this.conversationRepository.getAll(userId);
    const connectedParticipantIds: string[] = conversations.map((conv) => {
      return conv.user1._id.toString() === userId ? conv.user2._id.toString() : conv.user1._id.toString();
    });
    const participantPromises = users
      .filter((user) => !connectedParticipantIds.includes(user._id.toString()))
      .map(async (user) => {
        let { password, updatedAt, ...userProfile } = user;
        if (user.profileImage) {
          userProfile.profileImage = await getProfileImageDataUri(String(user.profileImage));
        }
        return userProfile as IUserProfile;
      });

    const unassociatedUsers = await Promise.all(participantPromises);
    return unassociatedUsers;
  }

  public async getChatPartners(userId: string): Promise<IChatPartner[]> {
    const conversations = await this.conversationRepository.getAll(userId);
    const participants = conversations.map((conv) => {
      return {
        userId: conv.user1._id.toString() === userId ? conv.user2._id.toString() : conv.user1._id.toString(),
        conversationId: conv._id.toString(),
      };
    });
    const participantPromises = participants.map(async ({ userId, conversationId }) => {
      const user = (await this.userRepository.findById(userId))!;
      const lastMessage = await this.getLastMessageInConversation(conversationId);
      let { password, updatedAt, ...userProfile } = user;
      if (user.profileImage) {
        userProfile.profileImage = await getProfileImageDataUri(String(user.profileImage));
      }
      return { ...userProfile, conversationId, lastMessage } as IChatPartner;
    });
    const activeParticipants = (await Promise.all(participantPromises)).filter(({ _id }) => Boolean(_id));
    return activeParticipants;
  }

  public async getUserProfile(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) return null;
    if (user.profileImage) {
      user.profileImage = await getProfileImageDataUri(String(user.profileImage));
    }
    const { password, updatedAt, ...userWithoutPassword } = user;
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
    broadcastUserUpdate(userId, updateData);
    return userWithoutPassword as IUserProfile;
  }

  public async setUserOnlineStatus({ userId, isOnline, lastSeen }: ISetOnlineStatus) {
    await this.userRepository.update(userId, {
      isOnline,
      lastSeen: lastSeen ? lastSeen : new Date(),
    });
  }

  public async updateUserProfileImage(userId: string, imageData: IProfileImage) {
    const user = (await this.userRepository.findById(userId))!;
    let profileImage: IProfileImage | null = null;
    if (!user.profileImage) {
      profileImage = (await this.profileImageRepository.create(imageData))!;
      await this.userRepository.update(userId, { profileImage: profileImage._id });
    } else {
      profileImage = (await this.profileImageRepository.update(String(user.profileImage), imageData)) as IProfileImage;
    }
    user.profileImage = await getProfileImageDataUri(String(profileImage._id));
    const { password, createdAt, updatedAt, ...userWithoutPassword } = user;
    broadcastUserUpdate(userId, { profileImage: user.profileImage });
    return userWithoutPassword as IUserProfile;
  }

  public async getCurrentUserProfile(userId: string) {
    const user = await this.getUserProfile(userId);
    if (!user) {
      throw ApiError.unauthorized("Invalid token. Authentication failed; your profile cannot be loaded.");
    }
    return user;
  }

  public async getPublicProfile(userId: string) {
    const user = await this.getUserProfile(userId);
    if (!user) {
      throw ApiError.notFound("User profile not found. The provided ID does not match any existing user.");
    }
    return user;
  }
}

const userService = new UserService();
export default userService;
