import { RootState } from "@/app/store";
import { apiClient } from "@/utils";
import apiEndpoints from "@/config/api";
import { IConversationRecipient, IUserProfile, IStartConversationRequestDTO } from "@shared/types";

export const getUnassociatedUsersApi = async (getState: () => RootState): Promise<IUserProfile[]> => {
  const token = getState().auth.token;
  const response = await apiClient.get(apiEndpoints.users.unconnected, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getConversationRecipientsApi = async (getState: () => RootState): Promise<IConversationRecipient[]> => {
  const token = getState().auth.token;
  const response = await apiClient.get(apiEndpoints.users.connected, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export const startNewConversationApi = async (
  { receiverId, initialMessage }: IStartConversationRequestDTO,
  getState: () => RootState
): Promise<IConversationRecipient> => {
  const token = getState().auth.token;
  const response = await apiClient.post(
    apiEndpoints.chat.startConversation,
    { receiverId, initialMessage },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
