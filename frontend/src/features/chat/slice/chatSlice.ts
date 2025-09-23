import { RootState } from "@/app/store";
import { createSlice } from "@reduxjs/toolkit";

interface ProfileState {
  fileUploadModalState: boolean;
}

const initialState: ProfileState = {
  fileUploadModalState: false,
};

const chatSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    showFileUploadModal: (state) => {
      state.fileUploadModalState = true;
    },
    closeFileUploadModal: (state) => {
      state.fileUploadModalState = false;
    },
  },
});

export const selectFileUploadModalState = (state: RootState) => state.chat.fileUploadModalState;

export const { showFileUploadModal, closeFileUploadModal } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
