import { Document } from "mongoose";
import { IProfileImage } from "./ProfileImageTypes";

export interface IUser extends Document {
  _id: string;
  fullname: string;
  email: string;
  statusMessage: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  settings: IUserSettings;
  profileImage: IProfileImage;
}

export type TUserWithoutPassword = Omit<IUser, "password">;

export interface IUserSettings {
  readReceipts: boolean;
  onlineStatus: boolean;
  typingIndicator: boolean;
}

export interface ICreateUserDTO {
  fullname: string;
  email: string;
  password: string;
}

export interface IUpdateUserDTO extends Partial<IUserSettings> {
  fullname?: string;
  email?: string;
  statusMessage?: string;
  password?: string;
}
