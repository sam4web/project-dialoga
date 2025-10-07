import { IMessage } from "./message";

export interface IConversation {
  _id: string;
  user1: string;
  user2: string;
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IStartConversationRequestDTO {
  receiverId: string;
  initialMessage: string;
}

export interface IConversationDetails {
  fullname: string;
  profileImage: string | null;
  isOnline: boolean;
  lastSeen: Date;
  stats: {
    messagesSent: number;
    mediaShared: number;
    daysActive: number;
  };
  details: {
    email: string;
    statusMessage: string;
  };
  showOnlineStatus: boolean;
  sharedMedia: string[];
}
