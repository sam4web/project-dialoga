import ApiError from "../../lib/errors/ApiError";
import User from "../models/User";
import { ICreateUserDTO, IUpdateUserDTO, IUser } from "../types/UserTypes";

export interface IUserRepository {
  getAll(): Promise<IUser[]>;
  create(userData: ICreateUserDTO): Promise<IUser>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  update(id: string, updatedData: IUpdateUserDTO): Promise<IUser | null>;
  delete(id: string): Promise<boolean>;
}

export default class UserRepository implements IUserRepository {
  public async getAll(): Promise<IUser[]> {
    try {
      const users = await User.find({}).populate("profileImage").select("-password -__v").lean();
      return users;
    } catch (error) {
      throw ApiError.internal("Failed to get users.");
    }
  }

  public async create(userData: ICreateUserDTO): Promise<IUser> {
    try {
      const newUser = await User.create(userData);
      return newUser;
    } catch (error) {
      throw ApiError.internal("Failed to create user.");
    }
  }

  public async findById(id: string): Promise<IUser | null> {
    try {
      const user = await User.findById(id).populate("profileImage").select("-__v").lean();
      return user;
    } catch (error) {
      throw ApiError.internal("Failed to find user.");
    }
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    try {
      const user = await User.findOne({ email }).populate("profileImage").select("-__v").lean();
      return user;
    } catch (error) {
      throw ApiError.internal("Failed to find user.");
    }
  }

  public async update(id: string, updateData: IUpdateUserDTO): Promise<IUser | null> {
    try {
      const updatedUser = await User.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      })
        .populate("profileImage")
        .select("-password -__v")
        .lean();
      return updatedUser as IUser | null;
    } catch (error) {
      throw ApiError.internal("Failed to update user.");
    }
  }

  public async delete(id: string): Promise<boolean> {
    try {
      const result = await User.deleteOne({ _id: id }).lean();
      return result.deletedCount > 0;
    } catch (error) {
      throw ApiError.internal("Failed to delete user.");
    }
  }
}
