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
