import { IUpdateUserDTO, IUser } from "../types";
import apiEndpoints from "@/config/api";
import { RootState } from "@/app/store";
import { apiClient } from "@/utils";

export const getCurrentUserProfileApi = async (getState: () => RootState): Promise<IUser> => {
  const token = getState().auth.token;
  const response = await apiClient.get(apiEndpoints.users.me, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getPublicProfileApi = async (userId: string, getState: () => RootState): Promise<IUser> => {
  const token = getState().auth.token;
  const response = await apiClient.get(apiEndpoints.users.profile(userId), {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateUserProfileApi = async (getState: () => RootState, updateData: IUpdateUserDTO): Promise<IUser> => {
  const token = getState().auth.token;
  const response = await apiClient.patch(apiEndpoints.users.me, updateData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateUserProfileImageApi = async (getState: () => RootState, updateImage: FormData): Promise<IUser> => {
  const token = getState().auth.token;
  const response = await apiClient.patch(apiEndpoints.users.meImage, updateImage, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
