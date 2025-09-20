import { Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  fullname: string;
  email: string;
  statusMessage: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  settings: IUserSettings;
  profileImage: IUserProfileImage;
}

export interface IUserProfileImage {
  name: string;
  data: string;
}

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

export interface IUpdateUserDTO extends Partial<IUserProfileImage>, Partial<IUserSettings> {
  fullname?: string;
  email?: string;
  statusMessage?: string;
  password?: string;
}
