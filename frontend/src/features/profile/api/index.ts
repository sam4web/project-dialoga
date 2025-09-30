import apiEndpoints from "@/config/api";
import { RootState } from "@/app/store";
import { apiClient } from "@/utils";
import { IUpdateUserDTO, IUserProfile } from "@shared/types/user";

export const getCurrentUserProfileApi = async (getState: () => RootState): Promise<IUserProfile> => {
  const token = getState().auth.token;
  const response = await apiClient.get(apiEndpoints.users.me, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getPublicProfileApi = async (userId: string, getState: () => RootState): Promise<IUserProfile> => {
  const token = getState().auth.token;
  const response = await apiClient.get(apiEndpoints.users.profile(userId), {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateUserProfileApi = async (
  getState: () => RootState,
  updateData: IUpdateUserDTO
): Promise<IUserProfile> => {
  const token = getState().auth.token;
  const response = await apiClient.patch(apiEndpoints.users.me, updateData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateUserProfileImageApi = async (
  getState: () => RootState,
  updateImage: FormData
): Promise<IUserProfile> => {
  const token = getState().auth.token;
  const response = await apiClient.patch(apiEndpoints.users.meImage, updateImage, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
