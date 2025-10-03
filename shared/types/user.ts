export interface IUser {
  _id: string;
  fullname: string;
  email: string;
  statusMessage: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  settings: IUserSettings;
  profileImage: string | null;
}

export interface IUserProfile extends Omit<IUser, "password" | "createdAt" | "updatedAt"> {}

export interface IUserSettings {
  readReceipts: boolean;
  onlineStatus: boolean;
  typingIndicator: boolean;
}

export interface IUpdateUserDTO extends Partial<IUserSettings> {
  fullname?: string;
  email?: string;
  statusMessage?: string;
  password?: string;
  profileImage?: string;
}

export interface IConversationRecipient extends IUserProfile {
  conversationId: string;
  isOnline: boolean;
  lastSeen: Date;
  lastMessage: string;
}
