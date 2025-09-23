import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../../shared/constants";
import userService from "./user.service";
import { IUpdateUserDTO } from "../../database/types/UserTypes";

class UserController {
  public async getAllUsers(request: Request, response: Response) {
    const userId: string = (request as any).userId;
    const users = await userService.getAllUsers(userId);
    response.status(HTTP_STATUS.OK).json(users);
    return;
  }

  public async getNewChatCandidates(request: Request, response: Response) {
    const userId: string = (request as any).userId;
    const newContacts = await userService.getNewChatCandidates(userId);
    response.status(HTTP_STATUS.OK).json(newContacts);
    return;
  }

  public async getUserProfile(request: Request, response: Response) {
    const userId: string = (request as any).userId;
    const user = await userService.getUserProfile(userId);
    response.status(HTTP_STATUS.OK).json(user);
    return;
  }

  public async updateUserProfile(request: Request, response: Response) {
    const userId: string = (request as any).userId;
    const updateData: IUpdateUserDTO = (request as any).validatedBody;
    const updatedUser = await userService.updateUserProfile(userId, updateData);
    response.status(HTTP_STATUS.OK).json(updatedUser);
    return;
  }
}

const userController = new UserController();
export default userController;
