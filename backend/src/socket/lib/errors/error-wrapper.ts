import { logger } from "../../../config";
import { AppSocket } from "../../types";

type SocketEventHandler<T extends any[]> = (socket: AppSocket, ...args: T) => void;

export const handleSocketError = (socket: AppSocket, error: Error) => {
  const userId = socket.data.userId || socket.id;
  logger.error(`[Socket Error] User ${userId} (${socket.id}): ${error.message}`, {
    stack: error.stack,
  });
  socket.emit("message:system", error.message);
};

export function wrapSocketHandler<T extends any[]>(handler: SocketEventHandler<T>): (...args: T) => void {
  return function (this: AppSocket, ...args: T) {
    const socket = this as AppSocket;
    try {
      handler(socket, ...args);
    } catch (error) {
      handleSocketError(socket, error as Error);
      const callback = args[args.length - 1];
      if (typeof callback === "function") {
        callback("error", "An internal server error occurred.");
      }
    }
  };
}
