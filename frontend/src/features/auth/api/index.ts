import api from "@/lib/axios";
import { ILoginRequestDTO, IRegisterRequestDTO, Token } from "../types";

export const loginApi = async (credentials: ILoginRequestDTO): Promise<Token> => {
  const response = await api.post("/api/auth/login", credentials);
  return response.data;
};

export const registerApi = async (credentials: IRegisterRequestDTO): Promise<Token> => {
  const response = await api.post("/api/auth/register", credentials);
  return response.data;
};

export const refreshApi = async (): Promise<Token> => {
  const response = await api.post("/api/auth/refresh");
  return response.data;
};

export const signoutApi = async (): Promise<void> => {
  await api.post("/api/auth/logout");
};
