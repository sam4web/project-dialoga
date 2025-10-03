import z from "zod";

export const textMessageInputSchema = z.object({
  message: z.string().min(1, "Input field cannot be empty."),
});

export type TTextMessageInputSchema = z.infer<typeof textMessageInputSchema>;
