import z from "zod";

export const loginSchema = z.object({
  email: z.email({
    error: (issue) => (issue.input === undefined ? "Email is required." : "Please enter a valid email address."),
  }),
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
    fullname: z
      .string({
        error: (issue) => (issue.input === undefined ? "Fullname is required." : "Fullname must be a valid string."),
      })
      .min(1, "Fullname is required."),
    confirmPassword: z
      .string({
        error: (issue) =>
          issue.input === undefined ? "Confirm password is required." : "Confirm password must be a valid string.",
      })
      .min(1, "Confirm password is required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password must match.",
    path: ["confirmPassword"],
  });
