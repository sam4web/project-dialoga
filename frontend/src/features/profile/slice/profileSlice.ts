import { RootState } from "@/store";
import { createSlice } from "@reduxjs/toolkit";

interface ProfileState {
  changePasswordModalState: boolean;
  updateProfileImageModalState: boolean;
}

const initialState: ProfileState = {
  changePasswordModalState: false,
  updateProfileImageModalState: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    showChangePasswordModal: (state) => {
      state.changePasswordModalState = true;
    },
    closeChangePasswordModal: (state) => {
      state.changePasswordModalState = false;
    },
    showUpdateProfileImageModal: (state) => {
      state.updateProfileImageModalState = true;
    },
    closeUpdateProfileImageModal: (state) => {
      state.updateProfileImageModalState = false;
    },
  },
});

export const selectChangePasswordModalState = (state: RootState) => state.profile.changePasswordModalState;
export const selectUpdateProfileImageModalState = (state: RootState) => state.profile.updateProfileImageModalState;

export const {
  closeChangePasswordModal,
  showChangePasswordModal,
  closeUpdateProfileImageModal,
  showUpdateProfileImageModal,
} = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
