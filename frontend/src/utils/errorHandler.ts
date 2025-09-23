import { AxiosError } from "axios";

export const handleApiError = (error: unknown, genericMessage: string): string => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message;
  }
  return genericMessage;
};
