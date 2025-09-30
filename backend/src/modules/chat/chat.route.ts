import { Router } from "express";
import { chatController, startConversationSchema } from ".";
import { authorize, validate } from "../../middlewares";

const chatRouter = Router();
chatRouter.use(authorize);
chatRouter.post("/conversations", validate(startConversationSchema), chatController.startNewConversation);

// Get Messages for a Specific Conversation
// chatRouter.get("/conversations/:conversationId/messages");

// Get Details of a Conversation
// chatRouter.get("/conversations/:conversationId");

export default chatRouter;
