import z from "zod";
import { requiredString } from "../../lib/schema";
import mongoose from "mongoose";

export const startConversationSchema = z.object({
  receiverId: requiredString("Receiver Id is required.", "Please enter a valid Id.").refine(
    (val) => mongoose.Types.ObjectId.isValid(val),
    { error: "Please enter a valid Id." }
  ),
});
