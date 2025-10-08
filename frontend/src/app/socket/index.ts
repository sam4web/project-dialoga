import { io, Socket } from "socket.io-client";
import { setDisconnected } from "@/app/slices";
import config from "@/config";
import { ClientToServerEvents } from "@shared/types";
import { registerSocketHandlers } from "./handlers";
import { AppSocket } from "./types";
import { AppStore } from "../store";

let socketInstance: AppSocket | null = null;
const SOCKET_URL = config.VITE_API_BASE_URL;

export const initializeSocket = (store: AppStore, token: string | null) => {
  if (!token) {
    if (socketInstance) {
      socketInstance.disconnect();
      socketInstance = null;
    }
    store.dispatch(setDisconnected());
    return null;
  }

  if (socketInstance && socketInstance.connected) {
    return;
  }

  const newSocket: Socket = io(SOCKET_URL, {
    transports: ["websocket"],
    auth: {
      token: `Bearer ${token}`,
    },
    autoConnect: true,
    reconnection: true,
  });

  socketInstance = newSocket;
  registerSocketHandlers(newSocket);
  return newSocket;
};

export const emitSocketEvent = <E extends keyof ClientToServerEvents>(
  eventName: E,
  ...args: Parameters<ClientToServerEvents[E]>
): boolean => {
  if (socketInstance && socketInstance.connected) {
    socketInstance.emit(eventName, ...args);
    return true;
  }
  return false;
};

export const disconnectSocket = (): boolean => {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
    return true;
  }
  return false;
};
