import { RootState } from "@/app/store";
import { createSlice } from "@reduxjs/toolkit";
import { fetchConnectedUsers, fetchUnconnectedUsers, sendStartNewConversationRequest } from "./chatThunks";
import { IConnectedUser, IUserProfile } from "@shared/types/user";

interface ChatState {
  connectedUsers: IConnectedUser[] | null;
  unconnectedUsers: IUserProfile[] | null;
}

const initialState: ChatState = {
  connectedUsers: null,
  unconnectedUsers: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConnectedUsers.fulfilled, (state, action) => {
        state.connectedUsers = action.payload;
      })
      .addCase(fetchUnconnectedUsers.fulfilled, (state, action) => {
        state.unconnectedUsers = action.payload;
      })
      .addCase(sendStartNewConversationRequest.fulfilled, (state, action) => {
        state.connectedUsers?.push(action.payload);
      });
  },
});

export const selectConnectedUsers = (state: RootState) => state.chat.connectedUsers;
export const selectUnconnectedUsers = (state: RootState) => state.chat.unconnectedUsers;
export const isConnectedUsersLoaded = (state: RootState) => Boolean(state.chat.connectedUsers);
export const isUnconnectedUsersLoaded = (state: RootState) => Boolean(state.chat.unconnectedUsers);

export const chatReducer = chatSlice.reducer;
