import z from "zod";
import { requiredString } from "../../lib/schema";

const passwordSchema = z
  .string()
  .min(8, "Password must be between 8 and 20 characters.")
  .max(20, "Password must be between 8 and 20 characters.")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
  .regex(/[0-9]/, "Password must contain at least one number.")
  .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character.");

export const loginSchema = z.object({
  email: z.email({
    error: (issue) => (issue.input === undefined ? "Email is required." : "Please enter a valid email address."),
  }),
  password: passwordSchema,
});

export const registerSchema = loginSchema
  .extend({
    fullname: requiredString("Fullname is required.", "Fullname must be a valid string."),
    confirmPassword: requiredString("Confirm password is required.", "Confirm password must be a valid string."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password must match.",
    path: ["confirmPassword"],
  });

export const changePasswordSchema = z
  .object({
    currentPassword: requiredString("Password is required.", "Password must be a valid string."),
    newPassword: passwordSchema,
    confirmNewPassword: requiredString("Confirm password is required.", "Confirm password must be a valid string."),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New password and confirm password must match.",
    path: ["confirmNewPassword"],
  });
