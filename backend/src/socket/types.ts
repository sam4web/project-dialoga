import { Socket } from "socket.io";

export interface ServerToClientEvents {
  "message:system": (message: string) => void;
  "user:connected": (userId: string) => void;
  "user:disconnected": (userId: string) => void;
}

export interface ClientToServerEvents {
  hello: (message: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  userId: string;
  socketId: string;
}

export type AppSocket = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
