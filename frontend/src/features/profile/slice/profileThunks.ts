import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUpdateUserDTO, IUser } from "../types";
import { getUserProfileApi, updateUserProfileApi } from "../api";
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

export const sendUpdateUserProfileRequest = createAsyncThunk<IUser, IUpdateUserDTO, ThunkApiConfig>(
  "auth/updateUserProfile",
  async (updateData, { getState, rejectWithValue }) => {
    try {
      const userData = await updateUserProfileApi(getState, updateData);
      return userData;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("Profile update failed. Please check your login status and ensure the data is valid.");
    }
  }
);
