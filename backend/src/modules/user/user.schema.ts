import z from "zod";

export const updateUserSchema = z.object({
  fullname: z.string().optional(),
  email: z.email().optional(),
  statusMessage: z.string().optional(),
  settings: z
    .object({
      readReceipts: z.boolean(),
      onlineStatus: z.boolean(),
      typingIndicator: z.boolean(),
    })
    .optional(),
  profileImage: z
    .object({
      name: z.string(),
      data: z.string(),
    })
    .optional(),
});
