import { wrapSocketHandler } from "../../socket/lib/errors/error-wrapper";
import { AppSocket } from "../../socket/types";

export const registerChatHandlers = (socket: AppSocket) => {
  socket.on(
    "chat:join_conversation",
    wrapSocketHandler((socket, conversationid) => {
      socket.join(conversationid);
    })
  );

  socket.on(
    "chat:leave_conversation",
    wrapSocketHandler((socket, conversationid) => {
      socket.leave(conversationid);
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
};
