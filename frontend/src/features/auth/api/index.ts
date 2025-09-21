import api from "@/lib/axios";
import { ILoginRequestDTO, IRegisterRequestDTO, TChangePasswordSchema, Token } from "../types";
import apiEndpoints from "@/config/api";
import { RootState } from "@/store";

export const loginApi = async (credentials: ILoginRequestDTO): Promise<Token> => {
  const response = await api.post(apiEndpoints.auth.login, credentials);
  return response.data;
};

export const registerApi = async (credentials: IRegisterRequestDTO): Promise<Token> => {
  const response = await api.post(apiEndpoints.auth.register, credentials);
  return response.data;
};

export const refreshApi = async (): Promise<Token> => {
  const response = await api.post(apiEndpoints.auth.refresh);
  return response.data;
};

export const signoutApi = async (): Promise<void> => {
  await api.post(apiEndpoints.auth.signout);
};

export const changePasswordApi = async (
  getState: () => RootState,
  credentials: TChangePasswordSchema
): Promise<void> => {
  const token = getState().auth.token;
  await api.patch(
    apiEndpoints.auth.changePassword,
    { ...credentials },
    { headers: { authorization: `Bearer ${token}` } }
  );
};
