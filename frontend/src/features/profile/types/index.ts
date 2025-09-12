import z from "zod";

export const updateProfileSchema = z.object({
  fullname: z.string().min(1, "Fullname is required."),
  email: z.string().min(1, "Email is required.").email("Please enter a valid email address."),
  statusMessage: z.string().min(1, "Status message is required."),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Password is required."),
    newPassword: z
      .string()
      .min(8, "Password must be between 8 and 20 characters.")
      .max(20, "Password must be between 8 and 20 characters.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
      .regex(/[0-9]/, "Password must contain at least one number.")
      .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character."),
    confirmNewPassword: z.string().min(1, "Confirm password is required."),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export type TUpdateProfileSchema = z.infer<typeof updateProfileSchema>;
export type TChangePasswordSchema = z.infer<typeof changePasswordSchema>;
