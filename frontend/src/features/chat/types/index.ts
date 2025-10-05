import z from "zod";

export const textMessageInputSchema = z.object({
  message: z
    .string()
    .min(1, "Message cannot be empty. Please enter some text.")
    .max(100, "Message is too long. Please limit it to 100 characters or less."),
});

export type TTextMessageInputSchema = z.infer<typeof textMessageInputSchema>;

export interface ISendTextMessage {
  conversationId: string;
  message: string;
}

export interface ISendImageMessage {
  conversationId: string;
  message: FormData;
}
