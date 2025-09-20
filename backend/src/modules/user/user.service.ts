import UserRepository, { IUserRepository } from "../../database/repositories/UserRepository";
import { IUpdateUserDTO, TUserWithoutPassword } from "../../database/types/UserTypes";
import ApiError from "../../lib/errors/ApiError";

class UserService {
  private userRepository: IUserRepository;
  constructor(userRepository: IUserRepository = new UserRepository()) {
    this.userRepository = userRepository;
  }

  public async getAllUsers(userId: string) {
    return (await this.userRepository.getAll()).filter((u) => u._id != userId);
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
