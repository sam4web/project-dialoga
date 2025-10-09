import { wrapSocketHandler } from "../../socket/lib/errors/error-wrapper";
import { AppSocket } from "../../socket/types";
import { userService } from "../user";

export const registerChatHandlers = (socket: AppSocket) => {
  socket.on(
    "chat:join_conversation",
    wrapSocketHandler((socket, conversationId) => {
      socket.join(conversationId);
    })
  );

  socket.on(
    "chat:leave_conversation",
    wrapSocketHandler((socket, conversationId) => {
      socket.leave(conversationId);
    })
  );

  socket.on(
    "chat:send_message",
    wrapSocketHandler((socket, { conversationId, message }) => {
      socket.to(conversationId).emit("chat:send_message", { message });
    })
  );

  socket.on(
    "chat:typing_start",
    wrapSocketHandler((socket, conversationId) => {
      socket.to(conversationId).emit("chat:typing_start");
    })
  );

  socket.on(
    "chat:typing_end",
    wrapSocketHandler((socket, conversationId) => {
      socket.to(conversationId).emit("chat:typing_end");
    })
  );

  socket.on(
    "chat:start_conversation",
    wrapSocketHandler(async (socket, { conversationId, recipientId }) => {
      const userProfile = await userService.getChatpartner(recipientId, conversationId);
      socket.broadcast.emit("chat:start_conversation", { recipientId, userProfile });
    })
  );
};
