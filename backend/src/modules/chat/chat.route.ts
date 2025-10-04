import { Router } from "express";
import { authorize, imageFileMiddleware, validate } from "../../middlewares";
import { conversationIdSchema, sendTextMessageSchema, startConversationSchema } from "./chat.schema";
import chatController from "./chat.controller";

const chatRouter = Router();

chatRouter.use(authorize);
chatRouter.post("/conversations", validate(startConversationSchema), chatController.startNewConversation);
chatRouter.get(
  "/conversations/:conversationId/messages",
  validate(conversationIdSchema, "params"),
  chatController.getConversationMessages
);
chatRouter.post(
  "/conversations/:conversationId/messages/text",
  validate(conversationIdSchema, "params"),
  validate(sendTextMessageSchema),
  chatController.sendTextMessage
);
chatRouter.post(
  "/conversations/:conversationId/messages/image",
  validate(conversationIdSchema, "params"),
  imageFileMiddleware,
  chatController.sendImageMessage
);
chatRouter.get(
  "/conversations/:conversationId/recipient",
  validate(conversationIdSchema, "params"),
  chatController.getRecipientProfile
);

// Get Details of a Conversation
// chatRouter.get("/conversations/:conversationId");

export default chatRouter;
