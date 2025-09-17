import bcrypt from "bcrypt";
import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  _id: string;
  fullname: string;
  email: string;
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
  password?: string;
}

const userSchema = new Schema<IUser>(
  {
    fullname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string, salt);
  next();
});

const User = model<IUser>("User", userSchema);

export default User;
