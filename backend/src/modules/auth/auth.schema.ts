import z from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address.").min(1, "Email is required."),
  password: z
    .string()
    .min(8, "Password must be between 8 and 20 characters.")
    .max(20, "Password must be between 8 and 20 characters.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character."),
});

export const registerSchema = loginSchema
  .extend({
    fullname: z.string().min(1, "Fullname is required."),
    confirmPassword: z.string().min(1, "Confirm password is required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
