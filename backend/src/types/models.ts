import { Model } from "mongoose";

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
}

export interface IUserMethods {
  doesPasswordMatch(password: string): Promise<boolean>;
}

export type UserModel = Model<IUser, {}, IUserMethods>;
