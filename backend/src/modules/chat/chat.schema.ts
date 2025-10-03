import z from "zod";
import mongoose from "mongoose";
import { requiredString } from "../../lib";

export const startConversationSchema = z.object({
  receiverId: requiredString("Receiver Id is required.", "Please enter a valid Id.").refine(
    (val) => mongoose.Types.ObjectId.isValid(val),
    { error: "Please enter a valid Id." }
  ),
  initialMessage: requiredString("Initial message is required.", "Initial message must be a valid string."),
});

export const getConversationMessagesSchema = z.object({
  conversationId: requiredString(
    "Conversation ID must be provided.",
    "Invalid conversation Id format. Please check the Id provided."
  ).refine((val) => mongoose.Types.ObjectId.isValid(val), {
    error: "Invalid conversation Id format. Please check the Id provided.",
  }),
});

export type TGetConversationMessagesSchema = z.infer<typeof getConversationMessagesSchema>;
