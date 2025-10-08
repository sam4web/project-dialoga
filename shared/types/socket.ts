import { IMessage } from "./message";
import { IDisconnectedUserPayload, IUpdateUserDTO } from "./user";

export interface ISocketCallback {
  status: "success" | "error";
  message: string;
}

export interface ServerToClientEvents {
  "message:system": (message: string) => void;
  "user:connected": (userId: string) => void;
  "user:disconnected": ({ userId, lastSeen }: IDisconnectedUserPayload) => void;
  "user:profile_updated": ({ userId, updatedData }: { userId: string; updatedData: IUpdateUserDTO }) => void;
  "chat:send_message": ({ message }: { message: IMessage }) => void;
}

export interface ClientToServerEvents {
  "user:profile_update": ({ userId, updateData }: { userId: string; updateData: IUpdateUserDTO }) => void;
  "chat:join_conversation": (conversationId: string) => void;
  "chat:leave_conversation": (conversationId: string) => void;
  "chat:send_message": ({ conversationId, message }: { conversationId: string; message: IMessage }) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  userId: string;
  socketId: string;
}
