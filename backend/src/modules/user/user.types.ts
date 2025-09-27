import { IUserProfileImage } from "../../database/types/UserTypes";

export interface IContact {
  _id: string;
  fullname: string;
  email: string;
  profileImage: IUserProfileImage;
  statusMessage: string;
}
export interface IConnectedUser extends IContact {
  // isOnline: boolean;
  // lastSeen: Date;
  // lastMessage: string
}
