import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { sendLoginRequest, sendRefreshTokenRequest } from "./authThunks";
import { RootState } from "@/store";

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
    builder.addMatcher(isAnyOf(sendLoginRequest.fulfilled, sendRefreshTokenRequest.fulfilled), (state, action) => {
      state.token = action.payload;
    });
  },
});

export const isUserAuthenticated = (state: RootState) => Boolean(state.auth.token);

export const authReducer = authSlice.reducer;
