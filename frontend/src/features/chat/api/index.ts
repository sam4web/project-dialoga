import { RootState } from "@/app/store";
import { apiClient } from "@/utils";
import apiEndpoints from "@/config/api";
import { IChatPartner, IUserProfile, IStartConversationRequestDTO, IMessage } from "@shared/types";

export const getUnassociatedUsersApi = async (getState: () => RootState): Promise<IUserProfile[]> => {
  const token = getState().auth.token;
  const response = await apiClient.get(apiEndpoints.users.unassociated, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getChatPartnersApi = async (getState: () => RootState): Promise<IChatPartner[]> => {
  const token = getState().auth.token;
  const response = await apiClient.get(apiEndpoints.users.partner, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export const getRecipientProfileApi = async (
  conversationId: string,
  getState: () => RootState
): Promise<IUserProfile> => {
  const token = getState().auth.token;
  const response = await apiClient.get(apiEndpoints.chat.recipient(conversationId), {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getConversationMessagesApi = async (
  conversationId: string,
  getState: () => RootState
): Promise<IMessage[]> => {
  const token = getState().auth.token;
  const response = await apiClient.get(apiEndpoints.chat.messages(conversationId), {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const startNewConversationApi = async (
  { receiverId, initialMessage }: IStartConversationRequestDTO,
  getState: () => RootState
): Promise<IChatPartner> => {
  const token = getState().auth.token;
  const response = await apiClient.post(
    apiEndpoints.chat.start,
    { receiverId, initialMessage },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
