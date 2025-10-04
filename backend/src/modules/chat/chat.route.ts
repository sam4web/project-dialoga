import { Router } from "express";
import { authorize, validate } from "../../middlewares";
import { conversationIdSchema, startConversationSchema } from "./chat.schema";
import chatController from "./chat.controller";

const chatRouter = Router();

chatRouter.use(authorize);
chatRouter.post("/conversations", validate(startConversationSchema), chatController.startNewConversation);
chatRouter
  .route("/conversations/:conversationId/messages")
  .get(validate(conversationIdSchema, "params"), chatController.getConversationMessages);
// .post(sendmessagehere);
chatRouter.get(
  "/conversations/:conversationId/recipient",
  validate(conversationIdSchema, "params"),
  chatController.getRecipientProfile
);

// Get Details of a Conversation
// chatRouter.get("/conversations/:conversationId");

export default chatRouter;
