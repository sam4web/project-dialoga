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
  isOnline: boolean;
  lastSeen: Date;
}

export interface IUserProfile extends Omit<IUser, "password" | "updatedAt"> {}

export interface IUserStatus {
  isOnline: boolean;
  lastSeen: Date;
}

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
  isOnline?: boolean;
  lastSeen?: Date;
}

export interface IChatPartner extends IUserProfile {
  conversationId: string;
  isOnline: boolean;
  lastSeen: Date;
  lastMessage: string;
}

export interface IDisconnectedUserPayload {
  userId: string;
  lastSeen?: string;
}
