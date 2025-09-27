import { IUserProfileImage } from "@/features/profile/types";

export type TMessage = {
  id: string;
  message: string;
  type: string;
  sentTime: string;
  sentBy: string;
};

export interface IContact {
  _id: string;
  fullname: string;
  email: string;
  profileImage: IUserProfileImage;
  statusMessage: string;
}
export interface IChatListItem extends IContact {
  isOnline: boolean;
  lastSeen: Date;
  lastMessage: string;
}
