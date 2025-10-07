import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import {
  sendChangePasswordRequest,
  sendLoginRequest,
  sendRefreshTokenRequest,
  sendRegisterRequest,
  sendSignOutRequest,
} from "./authThunks";
import { RootState } from "@/app/store";

interface IJwtPayload {
  id: string;
  email: string;
}

export interface AuthState {
  token: null | string;
  id: null | string;
}

const initialState: AuthState = {
  token: null,
  id: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(sendSignOutRequest.fulfilled, sendChangePasswordRequest.fulfilled), (state) => {
        state.token = null;
      })
      .addMatcher(
        isAnyOf(sendLoginRequest.fulfilled, sendRegisterRequest.fulfilled, sendRefreshTokenRequest.fulfilled),
        (state, action) => {
          state.token = action.payload;
          state.id = jwtDecode<IJwtPayload>(action.payload).id;
        }
      );
  },
});

export const isUserAuthenticated = (state: RootState) => Boolean(state.auth.token);
export const selectUserId = (state: RootState) => state.auth.id;
export const selectAuthToken = (state: RootState) => state.auth.token;

export const authReducer = authSlice.reducer;
