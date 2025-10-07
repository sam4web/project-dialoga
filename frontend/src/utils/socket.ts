import { setConnected, setDisconnected } from "@/app/slices";
import { AppStore } from "@/app/store";
import config from "@/config";
import { updateUserOnlineStatus } from "@/features/chat/slice";
import { io, Socket } from "socket.io-client";

let socketInstance: Socket | null = null;
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

  newSocket.on("connect", () => {
    store.dispatch(setConnected());
  });

  newSocket.on("disconnect", () => {
    store.dispatch(setDisconnected());
  });

  newSocket.on("user:connected", (userId: string) => {
    store.dispatch(updateUserOnlineStatus({ userId, isOnline: true }));
  });

  newSocket.on("user:disconnected", (payload: { userId: string; lastSeen: Date }) => {
    store.dispatch(
      updateUserOnlineStatus({
        userId: payload.userId,
        isOnline: false,
        lastSeen: payload.lastSeen,
      })
    );
  });

  return newSocket;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const emitSocketEvent = (eventName: string, payload: any): boolean => {
  if (socketInstance && socketInstance.connected) {
    socketInstance.emit(eventName, payload);
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
