import z from "zod";
import mongoose from "mongoose";
import { requiredString } from "../../lib";

export const updateUserSchema = z.object({
  fullname: z.string().optional(),
  email: z.email().optional(),
  statusMessage: z.string().optional(),
  settings: z
    .object({
      onlineStatus: z.boolean(),
      typingIndicator: z.boolean(),
    })
    .optional(),
});

export const getPublicProfileSchema = z.object({
  id: requiredString("Id must be provided.", "Invalid resource Id format. Please check the Id provided.").refine(
    (val) => mongoose.Types.ObjectId.isValid(val),
    {
      error: "Invalid resource Id format. Please check the Id provided.",
    }
  ),
});

export type TGetPublicProfileSchema = z.infer<typeof getPublicProfileSchema>;
