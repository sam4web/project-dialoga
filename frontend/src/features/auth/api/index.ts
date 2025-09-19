import api from "@/lib/axios";
import { LoginRequestDTO, Token } from "./types";

export const loginApi = async (credentials: LoginRequestDTO): Promise<Token> => {
  const response = await api.post("/api/auth/login", credentials);
  return response.data;
};

export const refreshApi = async (): Promise<Token> => {
  const response = await api.post("/api/auth/refresh");
  return response.data;
};
