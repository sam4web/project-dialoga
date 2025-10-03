import { RootState } from "@/app/store";
import { createSlice } from "@reduxjs/toolkit";
import { fetchUnassociatedUsers, sendStartNewConversationRequest, fetchConversationRecipients } from "./chatThunks";
import { IConversationRecipient, IUserProfile } from "@shared/types/user";

interface ChatState {
  conversationRecipients: IConversationRecipient[] | null;
  unassociatedUsers: IUserProfile[] | null;
}

const initialState: ChatState = {
  conversationRecipients: null,
  unassociatedUsers: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversationRecipients.fulfilled, (state, action) => {
        state.conversationRecipients = action.payload;
      })
      .addCase(fetchUnassociatedUsers.fulfilled, (state, action) => {
        state.unassociatedUsers = action.payload;
      })
      .addCase(sendStartNewConversationRequest.fulfilled, (state, action) => {
        state.conversationRecipients?.push(action.payload);
      });
  },
});

export const selectConnectedUsers = (state: RootState) => state.chat.conversationRecipients;
export const selectUnassociatedUsers = (state: RootState) => state.chat.unassociatedUsers;
export const isConnectedUsersLoaded = (state: RootState) => Boolean(state.chat.conversationRecipients);
export const isUnassociatedUsersLoaded = (state: RootState) => Boolean(state.chat.unassociatedUsers);

export const chatReducer = chatSlice.reducer;
