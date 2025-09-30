import { model, Schema } from "mongoose";
import { IProfileImage } from "../types";

const profileImageSchema = new Schema<IProfileImage>(
  {
    name: { type: String, required: true },
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true },
  },
  { timestamps: false }
);

const ProfileImage = model<IProfileImage>("ProfileImage", profileImageSchema);
export default ProfileImage;
