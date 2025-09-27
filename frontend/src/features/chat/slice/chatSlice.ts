import { RootState } from "@/app/store";
import { createSlice } from "@reduxjs/toolkit";
import { IChatListItem, IContact } from "../types";
import { fetchConnectedUsers, fetchUnconnectedUsers } from "./chatThunks";

interface ChatState {
  fileUploadModalState: boolean;
  connectedUsers: IChatListItem[] | null;
  unconnectedUsers: IContact[] | null;
}

const initialState: ChatState = {
  fileUploadModalState: false,
  connectedUsers: null,
  unconnectedUsers: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    showFileUploadModal: (state) => {
      state.fileUploadModalState = true;
    },
    closeFileUploadModal: (state) => {
      state.fileUploadModalState = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConnectedUsers.fulfilled, (state, action) => {
      state.connectedUsers = action.payload;
    });
    builder.addCase(fetchUnconnectedUsers.fulfilled, (state, action) => {
      state.unconnectedUsers = action.payload;
    });
  },
});

export const selectFileUploadModalState = (state: RootState) => state.chat.fileUploadModalState;

export const selectConnectedUsers = (state: RootState) => state.chat.connectedUsers;
export const selectUnconnectedUsers = (state: RootState) => state.chat.unconnectedUsers;
export const isConnectedUsersLoaded = (state: RootState) => Boolean(state.chat.connectedUsers);
export const isUnconnectedUsersLoaded = (state: RootState) => Boolean(state.chat.unconnectedUsers);

export const { showFileUploadModal, closeFileUploadModal } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
