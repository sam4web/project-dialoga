import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../types";
import { getUserProfileApi } from "../api";
import { AxiosError } from "axios";
import { ThunkApiConfig } from "@/store/types";

export const fetchUserProfile = createAsyncThunk<IUser, void, ThunkApiConfig>(
  "auth/getUserProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const userData = await getUserProfileApi(getState);
      return userData;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("Failed to retrieve profile due to an invalid or expired access token.");
    }
  }
);
