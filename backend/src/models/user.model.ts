import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUser, UserModel } from "../types/models";

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string, salt);
  next();
});

userSchema.methods.doesPasswordMatch = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const User = model<IUser, UserModel>("User", userSchema);

export default User;
