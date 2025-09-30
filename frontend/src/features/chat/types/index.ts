import { IUserProfile } from "@/features/profile/types";

export type TMessage = {
  id: string;
  message: string;
  type: string;
  sentTime: string;
  sentBy: string;
};

export interface IChatListItem extends IUserProfile {
  isOnline: boolean;
  lastSeen: Date;
  lastMessage: string;
}
