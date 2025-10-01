import { Router } from "express";
import { authorize, validate } from "../../middlewares";
import { startConversationSchema } from "./chat.schema";
import chatController from "./chat.controller";

const chatRouter = Router();

chatRouter.use(authorize);
chatRouter.post("/conversations", validate(startConversationSchema), chatController.startNewConversation);

// Get Messages for a Specific Conversation
// chatRouter.get("/conversations/:conversationId/messages");

// Get Details of a Conversation
// chatRouter.get("/conversations/:conversationId");

export default chatRouter;
