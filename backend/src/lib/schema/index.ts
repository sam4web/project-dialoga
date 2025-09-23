import z from "zod";

export const requiredString = (requiredMsg: string, notValidMsg: string): z.ZodString => {
  return z
    .string({
      error: (issue) => (issue.input === undefined ? requiredMsg : notValidMsg),
    })
    .min(1, requiredMsg);
};
