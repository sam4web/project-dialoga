import z from "zod";

export const updateUserSchema = z.object({
  fullname: z.string().optional(),
  email: z.email().optional(),
  statusMessage: z.string().optional(),
});
