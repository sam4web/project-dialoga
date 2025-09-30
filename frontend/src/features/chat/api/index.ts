import { RootState } from "@/app/store";
import { apiClient } from "@/utils";
import apiEndpoints from "@/config/api";
import { IConnectedUser, IUserProfile } from "@shared/types/user";

export const getUnConnectedUsersApi = async (getState: () => RootState): Promise<IUserProfile[]> => {
  const token = getState().auth.token;
  const response = await apiClient.get(apiEndpoints.users.unconnected, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getConnectedUsersApi = async (getState: () => RootState): Promise<IConnectedUser[]> => {
  const token = getState().auth.token;
  const response = await apiClient.get(apiEndpoints.users.connected, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};
