import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  token: null | string;
}

const initialState: AuthState = {
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

// export const {} = authSlice.actions;
export const authReducer = authSlice.reducer;
