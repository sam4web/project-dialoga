import { Router } from "express";
import authorize from "../../middlewares/auth.middleware";
import chatController from "./chat.controller";
import { startConversationSchema } from "./chat.schema";
import { validate } from "../../middlewares/validation.middleware";

const chatRouter = Router();
chatRouter
  .route("/conversations")
  .get(authorize, chatController.getAllConversations)
  .post(authorize, validate(startConversationSchema), chatController.startNewConversation);

// Get Messages for a Specific Conversation
// chatRouter.get("/conversations/:conversationId/messages");

// Get Details of a Conversation
// chatRouter.get("/conversations/:conversationId");

export default chatRouter;
