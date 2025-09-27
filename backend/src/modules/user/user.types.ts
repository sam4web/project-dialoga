import { IUserProfileImage } from "../../database/types/UserTypes";

export interface IContact {
  _id: string;
  fullname: string;
  email: string;
  statusMessage: string;
  profileImage: IUserProfileImage;
  // isOnline: boolean;
  // lastSeen: Date;
}
