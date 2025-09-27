import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ViewState {
  fileUploadModalState: boolean;
  changePasswordModalState: boolean;
}

const initialState: ViewState = {
  fileUploadModalState: false,
  changePasswordModalState: false,
};

const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    showChangePasswordModal: (state) => {
      state.changePasswordModalState = true;
    },
    closeChangePasswordModal: (state) => {
      state.changePasswordModalState = false;
    },
    showFileUploadModal: (state) => {
      state.fileUploadModalState = true;
    },
    closeFileUploadModal: (state) => {
      state.fileUploadModalState = false;
    },
  },
});

export const selectChangePasswordModalState = (state: RootState) => state.view.changePasswordModalState;
export const selectFileUploadModalState = (state: RootState) => state.view.fileUploadModalState;

export const { closeChangePasswordModal, showChangePasswordModal, showFileUploadModal, closeFileUploadModal } =
  viewSlice.actions;
export const viewReducer = viewSlice.reducer;
