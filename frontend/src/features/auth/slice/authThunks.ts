import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, refreshApi } from "../api";
import { LoginRequestDTO, Token } from "../api/types";
import { AxiosError } from "axios";

export const sendLoginRequest = createAsyncThunk<Token, LoginRequestDTO>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const token = await loginApi(credentials);
      return token;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("Login failed, Please try again.");
    }
  }
);

export const sendRefreshTokenRequest = createAsyncThunk<Token>("auth/refresh", async (_, { rejectWithValue }) => {
  try {
    const token = await refreshApi();
    return token;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data?.message);
    }
    return rejectWithValue("Login failed, Please try again.");
  }
});
