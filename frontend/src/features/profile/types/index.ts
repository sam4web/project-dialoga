import { passwordSchema } from "@/features/auth/types";
import z from "zod";

export const updateProfileSchema = z.object({
  fullname: z.string().min(1, "Fullname is required."),
  email: z.email("Enter a valid email address."),
  statusMessage: z.string().min(1, "Status message is required."),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Password is required."),
    newPassword: passwordSchema,
    confirmNewPassword: z.string().min(1, "Confirm password is required."),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New password and confirm password must match.",
    path: ["confirmNewPassword"],
  });

export type TUpdateProfileSchema = z.infer<typeof updateProfileSchema>;
export type TChangePasswordSchema = z.infer<typeof changePasswordSchema>;
