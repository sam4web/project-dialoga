import { Router } from "express";
import { authorize, validate } from "../../middlewares";
import { startConversationSchema, getConversationMessagesSchema } from "./chat.schema";
import chatController from "./chat.controller";

const chatRouter = Router();

chatRouter.use(authorize);
chatRouter.post("/conversations", validate(startConversationSchema), chatController.startNewConversation);
chatRouter
  .route("/conversations/:conversationId/messages")
  .get(validate(getConversationMessagesSchema, "params"), chatController.getConversationMessages);
// .post(sendmessagehere);

// Get Details of a Conversation
// chatRouter.get("/conversations/:conversationId");

export default chatRouter;
