import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  sendChangePasswordRequest,
  sendLoginRequest,
  sendRefreshTokenRequest,
  sendRegisterRequest,
  sendSignOutRequest,
} from "./authThunks";
import { RootState } from "@/store";

export interface AuthState {
  token: null | string;
  changePasswordModalState: boolean;
}

const initialState: AuthState = {
  token: null,
  changePasswordModalState: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    showChangePasswordModal: (state) => {
      state.changePasswordModalState = true;
    },
    closeChangePasswordModal: (state) => {
      state.changePasswordModalState = false;
    },
  },
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

export const selectChangePasswordModalState = (state: RootState) => state.auth.changePasswordModalState;
export const isUserAuthenticated = (state: RootState) => Boolean(state.auth.token);

export const { closeChangePasswordModal, showChangePasswordModal } = authSlice.actions;

export const authReducer = authSlice.reducer;
