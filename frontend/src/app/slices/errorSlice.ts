import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ErrorState {
  isTooManyRequests: boolean;
}

const initialState: ErrorState = {
  isTooManyRequests: false,
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setTooManyRequests: (state, action) => {
      state.isTooManyRequests = action.payload;
    },
  },
});

export const selectIsTooManyRequests = (state: RootState) => state.error.isTooManyRequests;

export const { setTooManyRequests } = errorSlice.actions;
export const errorReducer = errorSlice.reducer;
