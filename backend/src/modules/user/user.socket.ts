import { AppSocket } from "../../socket/types";
import { handleSocketError, wrapSocketHandler } from "../../socket/lib/errors/error-wrapper";
import userService from "./user.service";
import { IUpdateUserDTO } from "../../types";
import { getIo } from "../../socket";

export async function updateUserStatusAndBroadcast(socket: AppSocket, isOnline: boolean, lastSeen?: Date) {
  try {
    const userId = socket.data.userId;
    await userService.setUserOnlineStatus({ userId, isOnline, ...(lastSeen && { lastSeen }) });
    if (isOnline) {
      socket.broadcast.emit("user:connected", userId);
    } else {
      socket.broadcast.emit("user:disconnected", { userId, lastSeen: lastSeen! });
    }
  } catch (error) {
    handleSocketError(socket, error as Error);
  }
}

export function broadcastUserUpdate(userId: string, updatedData: IUpdateUserDTO) {
  const io = getIo();
  io.emit("user:profile_updated", { userId, updatedData });
}

export const registerUserHandlers = (socket: AppSocket) => {
  socket.on(
    "user:profile_update",
    wrapSocketHandler((socket, { userId, updateData }) => {
      socket.broadcast.emit("user:profile_updated", { userId, updatedData: updateData });
    })
  );
};
