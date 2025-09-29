import ApiError from "../../lib/errors/ApiError";
import ProfileImage from "../models/ProfileImage";
import { IProfileImage, IUpdateProfileImageDTO } from "../types/ProfileImageTypes";

export interface IProfileImageRepository {
  findById(id: string): Promise<IProfileImage | null>;
  create(imageData: IUpdateProfileImageDTO): Promise<IProfileImage>;
  update(id: string, updateData: IUpdateProfileImageDTO): Promise<IProfileImage | null>;
}

export default class ProfileImageRepository implements IProfileImageRepository {
  public async findById(id: string): Promise<IProfileImage | null> {
    try {
      const image = await ProfileImage.findById(id).select("-__v").lean();
      return image as IProfileImage | null;
    } catch (error) {
      throw ApiError.internal("Failed to find profile image.");
    }
  }

  public async create(imageData: IUpdateProfileImageDTO): Promise<IProfileImage> {
    try {
      const image = await ProfileImage.create(imageData);
      return image;
    } catch (error) {
      throw ApiError.internal("Failed to create profile image.");
    }
  }

  public async update(id: string, updateData: IUpdateProfileImageDTO): Promise<IProfileImage | null> {
    try {
      const updatedUser = await ProfileImage.findByIdAndUpdate(id, updateData, {
        new: true,
      })
        .select("-__v")
        .lean();
      return updatedUser as IProfileImage | null;
    } catch (error) {
      throw ApiError.internal("Failed to update user.");
    }
  }
}
