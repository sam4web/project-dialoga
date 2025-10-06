import { ExtendedError } from "socket.io";
import { AppSocket } from "../types";
import { ApiError, validateAccessToken } from "../../lib";

export const authorize = async (socket: AppSocket, next: (err?: ExtendedError) => void) => {
  const token = socket.handshake.headers.authorization;
  try {
    const userId = await validateAccessToken(token || "");
    socket.data.userId = userId;
    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error during authentication.";
    return next(ApiError.internal(errorMessage));
  }
};
