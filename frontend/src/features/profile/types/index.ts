import z from "zod";

export const updateProfileSchema = z.object({
  fullname: z.string().min(1, "Fullname is required."),
  email: z.string().min(1, "Email is required.").email("Please enter a valid email address."),
  statusMessage: z.string().min(1, "Status message is required."),
});

export type TUpdateProfileSchema = z.infer<typeof updateProfileSchema>;
