import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../../../../shared/constants";
import { IProfileImage, IUpdateUserDTO } from "../../database";
import userService from "./user.service";
import { TGetPublicProfileSchema } from "./user.schema";
import { ApiError } from "../../lib";

class UserController {
  public async getAllUsers(request: Request, response: Response) {
    const userId: string = (request as any).userId;
    const users = await userService.getAllUsers(userId);
    response.status(HTTP_STATUS.OK).json(users);
    return;
  }

  public async getUnassociatedUsers(request: Request, response: Response) {
    const userId: string = (request as any).userId;
    const unassociatedUsers = await userService.getUnassociatedUsers(userId);
    response.status(HTTP_STATUS.OK).json(unassociatedUsers);
    return;
  }

  public async getChatPartners(request: Request, response: Response) {
    const userId: string = (request as any).userId;
    const connectedUsers = await userService.getChatPartners(userId);
    response.status(HTTP_STATUS.OK).json(connectedUsers);
    return;
  }

  public async getCurrentUserProfile(request: Request, response: Response) {
    const userId: string = (request as any).userId;
    const user = await userService.getCurrentUserProfile(userId);
    response.status(HTTP_STATUS.OK).json(user);
    return;
  }

  public async getPublicProfile(request: Request, response: Response, next: NextFunction) {
    const { id: targetId }: TGetPublicProfileSchema = (request as any).validatedParams;
    const user = await userService.getPublicProfile(targetId);
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

  public async updateUserProfileImage(request: Request, response: Response) {
    const userId: string = (request as any).userId;
    const { name, data, mimetype: contentType } = (request as any).files.image;
    const updateImageData = { name, data, contentType } as IProfileImage;
    const updatedUser = await userService.updateUserProfileImage(userId, updateImageData);
    response.status(HTTP_STATUS.OK).json(updatedUser);
    return;
  }
}

const userController = new UserController();
export default userController;
