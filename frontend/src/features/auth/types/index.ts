import z from "zod";

export const passwordSchema = z
  .string()
  .min(8, "Password must be between 8 and 20 characters.")
  .max(20, "Password must be between 8 and 20 characters.")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
  .regex(/[0-9]/, "Password must contain at least one number.")
  .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character.");

export const signInSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: passwordSchema,
});

export const signUpSchema = signInSchema
  .extend({
    fullname: z.string().min(1, "Fullname is required."),
    confirmPassword: z.string().min(1, "Confirm password is required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password must match.",
    path: ["confirmPassword"],
  });

export type TSignInSchema = z.infer<typeof signInSchema>;
export type TSignUpSchema = z.infer<typeof signUpSchema>;

export type Token = string;

export interface ILoginRequestDTO {
  email: string;
  password: string;
}

export interface IRegisterRequestDTO {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}
