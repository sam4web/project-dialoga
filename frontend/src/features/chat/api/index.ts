import { RootState } from "@/app/store";
import { apiClient } from "@/utils";
import apiEndpoints from "@/config/api";
import { IConnectedUser, IUserProfile, IStartConversationRequestDTO } from "@shared/types";

export const getUnconnectedUsersApi = async (getState: () => RootState): Promise<IUserProfile[]> => {
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

export const startNewConversationApi = async (
  { receiverId, initialMessage }: IStartConversationRequestDTO,
  getState: () => RootState
): Promise<IConnectedUser> => {
  const token = getState().auth.token;
  const response = await apiClient.post(
    apiEndpoints.chat.startConversation,
    { receiverId, initialMessage },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
