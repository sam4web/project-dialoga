import { ILoginRequestDTO, IRegisterRequestDTO, TChangePasswordSchema, Token } from "../types";
import apiEndpoints from "@/config/api";
import { RootState } from "@/app/store";
import { apiClient } from "@/utils";

export const loginApi = async (credentials: ILoginRequestDTO): Promise<Token> => {
  const response = await apiClient.post(apiEndpoints.auth.login, credentials);
  return response.data;
};

export const registerApi = async (credentials: IRegisterRequestDTO): Promise<Token> => {
  const response = await apiClient.post(apiEndpoints.auth.register, credentials);
  return response.data;
};

export const refreshApi = async (): Promise<Token> => {
  const response = await apiClient.post(apiEndpoints.auth.refresh);
  return response.data;
};

export const signoutApi = async (): Promise<void> => {
  await apiClient.post(apiEndpoints.auth.signout);
};

export const changePasswordApi = async (
  getState: () => RootState,
  credentials: TChangePasswordSchema
): Promise<void> => {
  const token = getState().auth.token;
  await apiClient.patch(
    apiEndpoints.auth.changePassword,
    { ...credentials },
    { headers: { authorization: `Bearer ${token}` } }
  );
};
