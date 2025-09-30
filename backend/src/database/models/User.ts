import bcrypt from "bcrypt";
import { Schema, UpdateQuery, model } from "mongoose";
import { IUser, IUserSettings } from "../types";

const settingsSchema = new Schema<IUserSettings>(
  {
    readReceipts: { type: Boolean, default: true },
    onlineStatus: { type: Boolean, default: true },
    typingIndicator: { type: Boolean, default: false },
  },
  { _id: false }
);

const userSchema = new Schema<IUser>(
  {
    fullname: { type: String, required: true, trim: true },
    statusMessage: { type: String, default: "", trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true },
    settings: { type: settingsSchema, default: () => ({}) },
    profileImage: { type: Schema.Types.ObjectId, ref: "ProfileImage", default: null },
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
