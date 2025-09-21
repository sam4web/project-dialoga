import api from "@/lib/axios";
import { IUpdateUserDTO, IUser } from "../types";
import { RootState } from "@/store";

export const getUserProfileApi = async (getState: () => RootState): Promise<IUser> => {
  const token = getState().auth.token;
  const response = await api.get("/api/users/profile", { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export const updateUserProfileApi = async (getState: () => RootState, updateData: IUpdateUserDTO): Promise<IUser> => {
  const token = getState().auth.token;
  const response = await api.patch("/api/users/profile", updateData, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};
