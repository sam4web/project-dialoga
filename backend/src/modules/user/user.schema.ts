import mongoose from "mongoose";
import z from "zod";

export const updateUserParamSchema = z
  .object({
    userId: z.string(),
  })
  .refine((data) => mongoose.Types.ObjectId.isValid(data.userId), {
    message: "The provided user ID is not valid.",
    path: ["userId"],
  });

export const updateUserSchema = z.object({
  fullname: z.string().optional(),
  email: z.email().optional(),
  statusMessage: z.string().optional(),
});
