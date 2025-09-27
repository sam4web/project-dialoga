import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  sendChangePasswordRequest,
  sendLoginRequest,
  sendRefreshTokenRequest,
  sendRegisterRequest,
  sendSignOutRequest,
} from "./authThunks";
import { RootState } from "@/app/store";

export interface AuthState {
  token: null | string;
}

const initialState: AuthState = {
  token: null,
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
        }
      );
  },
});

export const isUserAuthenticated = (state: RootState) => Boolean(state.auth.token);

export const authReducer = authSlice.reducer;
