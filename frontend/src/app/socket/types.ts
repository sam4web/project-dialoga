import { ClientToServerEvents, ServerToClientEvents } from "@shared/types/socket";
import { Socket } from "socket.io-client";

export type AppSocket = Socket<ServerToClientEvents, ClientToServerEvents>;
