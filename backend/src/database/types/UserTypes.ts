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
  profileImage: string | null;
}

export interface IUserProfile extends Omit<IUser, "password" | "createdAt" | "updatedAt"> {}

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
  profileImage?: string;
}
