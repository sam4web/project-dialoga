import api from "@/lib/axios";
import { IUser } from "../types";
import { RootState } from "@/store";

export const getUserProfileApi = async (getState: () => RootState): Promise<IUser> => {
  const token = getState().auth.token;
  const response = await api.get("/api/users/profile", { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};
