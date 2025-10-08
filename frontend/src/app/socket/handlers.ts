import { store } from "../store";
import { setConnected, setDisconnected } from "../slices";
import { updateUserOnlineStatus, updateUserProfile } from "@/features/chat/slice";
import { IDisconnectedUserPayload, IUpdateUserDTO } from "@shared/types";
import { AppSocket } from "./types";

export const registerSocketHandlers = (socket: AppSocket) => {
  socket.on("connect", () => {
    store.dispatch(setConnected());
  });

  socket.on("disconnect", () => {
    store.dispatch(setDisconnected());
  });

  socket.on("user:connected", (userId: string) => {
    store.dispatch(updateUserOnlineStatus({ userId, isOnline: true }));
  });

  socket.on("user:disconnected", (payload: IDisconnectedUserPayload) => {
    store.dispatch(
      updateUserOnlineStatus({
        isOnline: false,
        ...payload,
      })
    );
  });

  socket.on("user:profile_updated", (payload: { userId: string; updatedData: IUpdateUserDTO }) => {
    store.dispatch(
      updateUserProfile({
        userId: payload.userId,
        updatedData: payload.updatedData,
      })
    );
  });
};
