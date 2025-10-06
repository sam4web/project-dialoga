import { Socket } from "socket.io";
import { IDisconnectedUserPayload, IUpdateUserDTO } from "../types";

export interface ISocketCallback {
  status: "success" | "error";
  message: string;
}

export interface ServerToClientEvents {
  "message:system": (message: string) => void;
  "user:connected": (userId: string) => void;
  "user:disconnected": ({ userId, lastSeen }: IDisconnectedUserPayload) => void;
  "user:profile_updated": ({ userId, updatedData }: { userId: string; updatedData: IUpdateUserDTO }) => void;
}

export interface ClientToServerEvents {}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  userId: string;
  socketId: string;
}

export type AppSocket = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
