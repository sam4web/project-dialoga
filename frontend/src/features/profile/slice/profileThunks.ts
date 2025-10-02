import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentUserProfileApi, getPublicProfileApi, updateUserProfileApi, updateUserProfileImageApi } from "../api";
import { ThunkApiConfig } from "@/app/store";
import { IUpdateUserDTO, IUserProfile } from "@shared/types/user";
import { handleApiError } from "@/utils";

export const fetchCurrentUserProfile = createAsyncThunk<IUserProfile, void, ThunkApiConfig>(
  "user/getCurrentUserProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const userData = await getCurrentUserProfileApi(getState);
      return userData;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to retrieve profile due to an invalid or expired access token.")
      );
    }
  }
);
export const fetchPublicProfile = createAsyncThunk<IUserProfile, string, ThunkApiConfig>(
  "user/getPublicProfile",
  async (userId, { getState, rejectWithValue }) => {
    try {
      const userData = await getPublicProfileApi(userId, getState);
      return userData;
    } catch (error) {
      return rejectWithValue(handleApiError(error, "Cannot locate a user profile matching the provided identifier."));
    }
  }
);

export const sendUpdateUserProfileRequest = createAsyncThunk<IUserProfile, IUpdateUserDTO, ThunkApiConfig>(
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

export const sendUpdateUserProfileImageRequest = createAsyncThunk<IUserProfile, FormData, ThunkApiConfig>(
  "user/updateUserProfileImage",
  async (updateImage, { getState, rejectWithValue }) => {
    try {
      const userData = await updateUserProfileImageApi(getState, updateImage);
      return userData;
    } catch (error) {
      return rejectWithValue(
        handleApiError(
          error,
          "Profile image update failed. Please check your login status and ensure the data is valid."
        )
      );
    }
  }
);
