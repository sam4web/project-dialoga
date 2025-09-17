import bcrypt from "bcrypt";
import { Document, Schema, UpdateQuery, model } from "mongoose";

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

const userSchema = new Schema<IUser>(
  {
    fullname: { type: String, required: true },
    statusMessage: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as UpdateQuery<any>;
  if (update && typeof update?.password === "string") {
    const salt = await bcrypt.genSalt(10);
    update.password = await bcrypt.hash(update.password, salt);
  }
  next();
});

const User = model<IUser>("User", userSchema);

export default User;
