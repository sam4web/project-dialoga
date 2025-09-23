import { IUpdateUserDTO, IUser } from "../types";
import apiEndpoints from "@/config/api";
import { RootState } from "@/app/store";
import { apiClient } from "@/utils";

export const getUserProfileApi = async (getState: () => RootState): Promise<IUser> => {
  const token = getState().auth.token;
  const response = await apiClient.get(apiEndpoints.users.profile, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export const updateUserProfileApi = async (getState: () => RootState, updateData: IUpdateUserDTO): Promise<IUser> => {
  const token = getState().auth.token;
  const response = await apiClient.patch(apiEndpoints.users.profile, updateData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
