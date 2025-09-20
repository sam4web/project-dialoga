import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, refreshApi, registerApi, signoutApi } from "../api";
import { IRegisterRequestDTO, ILoginRequestDTO, Token } from "../types";
import { AxiosError } from "axios";
import { ThunkApiConfig } from "@/store/types";

export const sendLoginRequest = createAsyncThunk<Token, ILoginRequestDTO, ThunkApiConfig>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const token = await loginApi(credentials);
      return token;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("Authentication failed. Please try logging in again.");
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
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("Registration unsuccessful. Please try again in a few moments.");
    }
  }
);

export const sendRefreshTokenRequest = createAsyncThunk<Token, void>("auth/refresh", async (_, { rejectWithValue }) => {
  try {
    const token = await refreshApi();
    return token;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data?.message);
    }
    return rejectWithValue("Could not refresh your session. Please log in to continue.");
  }
});

export const sendSignOutRequest = createAsyncThunk<void>("auth/signOut", async (_, { rejectWithValue }) => {
  try {
    await signoutApi();
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data?.message);
    }
    return rejectWithValue("Failed to log out. For security, please clear your cookies or close your browser.");
  }
});
