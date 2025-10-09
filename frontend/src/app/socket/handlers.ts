import { store } from "../store";
import { setConnected, setDisconnected } from "../slices";
import { startNewConversation, updateUserOnlineStatus, updateUserProfile } from "@/features/chat/slice";
import { IDisconnectedUserPayload } from "@shared/types";
import { AppSocket } from "./types";

export const registerSocketHandlers = (socket: AppSocket) => {
  socket.on("connect", () => {
    store.dispatch(setConnected());
  });

  socket.on("disconnect", () => {
    store.dispatch(setDisconnected());
  });

  socket.on("user:connected", (userId) => {
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

  socket.on("user:profile_updated", (payload) => {
    store.dispatch(
      updateUserProfile({
        userId: payload.userId,
        updatedData: payload.updatedData,
      })
    );
  });

  socket.on("chat:start_conversation", (paylaod) => {
    const { recipientId, userProfile } = paylaod;
    const userId = store.getState().auth.id!;
    if (userId.localeCompare(recipientId) !== 0) {
      return;
    }
    store.dispatch(startNewConversation(userProfile));
  });
};
