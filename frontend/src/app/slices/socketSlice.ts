import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface SocketState {
  isConnected: boolean;
}
const initialState: SocketState = {
  isConnected: false,
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setConnected: (state) => {
      state.isConnected = true;
    },
    setDisconnected: (state) => {
      state.isConnected = false;
    },
  },
});

export const selectIsConnected = (state: RootState) => state.socket.isConnected;

export const { setConnected, setDisconnected } = socketSlice.actions;
export const socketReducer = socketSlice.reducer;
