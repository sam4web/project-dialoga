import api from "@/lib/axios";
import { IUpdateUserDTO, IUser } from "../types";
import apiEndpoints from "@/config/api";
import { RootState } from "@/app/store";

export const getUserProfileApi = async (getState: () => RootState): Promise<IUser> => {
  const token = getState().auth.token;
  const response = await api.get(apiEndpoints.users.profile, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export const updateUserProfileApi = async (getState: () => RootState, updateData: IUpdateUserDTO): Promise<IUser> => {
  const token = getState().auth.token;
  const response = await api.patch(apiEndpoints.users.profile, updateData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
