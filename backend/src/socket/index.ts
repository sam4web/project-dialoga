import { Server as SocketIOServer } from "socket.io";
import { Server as HttpServer } from "http";
import { AppSocket, ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "./types";
import { corsOptions, logger } from "../config";
import { authorize } from "./middleware";

let io: SocketIOServer<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData> | null = null;

export const initSocketIO = (httpServer: HttpServer): SocketIOServer => {
  if (io) {
    logger.warn("Socket.IO already initialized. Returning existing instance.");
  }

  io = new SocketIOServer<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer, {
    cors: corsOptions,
  });

  io.use(authorize);

  io.on("connection", async (socket: AppSocket) => {
    logger.info(`[Socket.IO] Client connected: ${socket.id}`);

    // Register module-specific handlers for this socket

    socket.on("disconnect", (reason: string) => {
      logger.info(`[Socket.IO] Client disconnected: ${socket.id} (Reason: ${reason})`);
    });

    socket.on("error", (error: Error) => {
      logger.error(`[Socket.IO] Socket error for ${socket.id}: ${error.message}`, { stack: error.stack });
      socket.emit("message:system", `A critical socket error occurred: ${error.message}`);
    });
  });

  return io;
};

export const getIo = (): SocketIOServer<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData> => {
  if (!io) {
    throw new Error("Socket.IO not initialized. Call initSocketIO first.");
  }
  return io;
};
