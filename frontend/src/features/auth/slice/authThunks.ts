import { createAsyncThunk } from "@reduxjs/toolkit";
import { changePasswordApi, loginApi, refreshApi, registerApi, signoutApi } from "../api";
import { IRegisterRequestDTO, ILoginRequestDTO, Token, TChangePasswordSchema } from "../types";
import { handleApiError } from "@/utils";
import { ThunkApiConfig } from "@/app/store";

export const sendLoginRequest = createAsyncThunk<Token, ILoginRequestDTO, ThunkApiConfig>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const token = await loginApi(credentials);
      return token;
    } catch (error) {
      return rejectWithValue(handleApiError(error, "Authentication failed. Please try logging in again."));
    }
  }
);

export const sendRegisterRequest = createAsyncThunk<Token, IRegisterRequestDTO, ThunkApiConfig>(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const token = await registerApi(credentials);
      return token;
    } catch (error) {
      return rejectWithValue(handleApiError(error, "Registration unsuccessful. Please try again in a few moments."));
    }
  }
);

export const sendRefreshTokenRequest = createAsyncThunk<Token, void>("auth/refresh", async (_, { rejectWithValue }) => {
  try {
    const token = await refreshApi();
    return token;
  } catch (error) {
    return rejectWithValue(handleApiError(error, "Could not refresh your session. Please log in to continue."));
  }
});

export const sendSignOutRequest = createAsyncThunk<void>("auth/signOut", async (_, { rejectWithValue }) => {
  try {
    await signoutApi();
  } catch (error) {
    return rejectWithValue(
      handleApiError(error, "Failed to log out. For security, please clear your cookies or close your browser.")
    );
  }
});

export const sendChangePasswordRequest = createAsyncThunk<void, TChangePasswordSchema, ThunkApiConfig>(
  "auth/change-password",
  async (credentials, { getState, rejectWithValue }) => {
    try {
      await changePasswordApi(getState, credentials);
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to update password. Please check your information and try again.")
      );
    }
  }
);
