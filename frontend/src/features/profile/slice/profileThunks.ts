import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUpdateUserDTO, IUser } from "../types";
import { getUserProfileApi, updateUserProfileApi } from "../api";
import { ThunkApiConfig } from "@/app/store";
import { handleApiError } from "@/utils";

export const fetchUserProfile = createAsyncThunk<IUser, void, ThunkApiConfig>(
  "user/getUserProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const userData = await getUserProfileApi(getState);
      return userData;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to retrieve profile due to an invalid or expired access token.")
      );
    }
  }
);

export const sendUpdateUserProfileRequest = createAsyncThunk<IUser, IUpdateUserDTO, ThunkApiConfig>(
  "user/updateUserProfile",
  async (updateData, { getState, rejectWithValue }) => {
    try {
      const userData = await updateUserProfileApi(getState, updateData);
      return userData;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Profile update failed. Please check your login status and ensure the data is valid.")
      );
    }
  }
);
