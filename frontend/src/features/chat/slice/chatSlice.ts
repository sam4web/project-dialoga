import { RootState } from "@/app/store";
import { createSlice } from "@reduxjs/toolkit";
import { fetchUnassociatedUsers, sendStartNewConversationRequest, fetchChatPartners } from "./chatThunks";
import { IChatPartner, IUserProfile } from "@shared/types/user";

interface ChatState {
  chatPartners: IChatPartner[] | null;
  unassociatedUsers: IUserProfile[] | null;
}

const initialState: ChatState = {
  chatPartners: null,
  unassociatedUsers: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatPartners.fulfilled, (state, action) => {
        state.chatPartners = action.payload;
      })
      .addCase(fetchUnassociatedUsers.fulfilled, (state, action) => {
        state.unassociatedUsers = action.payload;
      })
      .addCase(sendStartNewConversationRequest.fulfilled, (state, action) => {
        const recipient = action.payload;
        state.chatPartners?.push(recipient);
        state.unassociatedUsers = (state.unassociatedUsers ?? [])?.filter((user) => user._id !== recipient._id);
      });
  },
});

export const selectChatPartners = (state: RootState) => state.chat.chatPartners;
export const selectUnassociatedUsers = (state: RootState) => state.chat.unassociatedUsers;
export const isChatPartnersLoaded = (state: RootState) => Boolean(state.chat.chatPartners);
export const isUnassociatedUsersLoaded = (state: RootState) => Boolean(state.chat.unassociatedUsers);

export const chatReducer = chatSlice.reducer;
