import { NextFunction, Request, Response } from "express";
import UserRepository, { IUserRepository } from "../../database/repositories/UserRepository";
import { HTTP_STATUS } from "../../../../shared/constants";
import ApiError from "../../lib/errors/ApiError";

class UserController {
  private userRepository: IUserRepository;
  constructor(userRepository: IUserRepository = new UserRepository()) {
    this.userRepository = userRepository;
  }

  public getAllUsers = async (request: Request, response: Response, next: NextFunction) => {
    const userId: string = (request as any).userId;
    const users = (await this.userRepository.getAll()).filter((u) => u._id != userId);
    response.status(HTTP_STATUS.OK).json({ users });
    return;
  };

  public updateUser = async (request: Request, response: Response, next: NextFunction) => {
    const decodedUserId: string = (request as any).userId;
    const userId: string = (request as any).validatedParams?.userId;
    const updateData = (request as any).validatedBody;
    if (decodedUserId.localeCompare(userId) !== 0) {
      next(ApiError.forbidden("Forbidden: You do not have permission to perform this action."));
      return;
    }
    const updatedUser = await this.userRepository.update(userId, { ...updateData });
    if (!updatedUser) {
      next(ApiError.conflict("An error occurred while updating your data. Please try again."));
      return;
    }
    response.status(HTTP_STATUS.OK).json(updatedUser);
    return;
  };
}

const userController = new UserController();
export default userController;
