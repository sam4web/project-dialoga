import { Socket } from "socket.io";
import { logger } from "../../config";
import {
  AppSocket,
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "../../socket/types";
import { handleSocketError, wrapSocketHandler } from "../../socket/lib/errors/error-wrapper";
import userService from "./user.service";
import { IUserStatus } from "../../types";

export async function registerUserHandlers(socket: AppSocket) {
  logger.info(`[Socket] User connected: ${socket.id}`);
  //   socket.on("user:connect");
}

export async function updateUserStatusAndBroadcast(socket: AppSocket, isOnline: boolean, lastSeen?: Date) {
  try {
    const userId = socket.data.userId;
    await userService.setUserOnlineStatus({ userId, isOnline, ...(lastSeen && { lastSeen }) });
    if (isOnline) {
      socket.broadcast.emit("user:connected", userId);
    } else {
      socket.broadcast.emit("user:disconnected", { userId, lastSeen: lastSeen?.toISOString() });
    }
  } catch (error) {
    handleSocketError(socket, error as Error);
  }
}
