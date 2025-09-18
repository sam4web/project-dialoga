import { Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  fullname: string;
  email: string;
  statusMessage: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateUserDTO {
  fullname: string;
  email: string;
  password: string;
}

export interface IUpdateUserDTO {
  fullname?: string;
  email?: string;
  statusMessage?: string;
  password?: string;
}
