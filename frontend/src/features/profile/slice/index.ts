import { RootState } from "@/store";
import { createSlice } from "@reduxjs/toolkit";

interface ProfileState {
  changePasswordModalState: boolean;
}

const initialState: ProfileState = {
  changePasswordModalState: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    closeChangePasswordModal: (state) => {
      state.changePasswordModalState = false;
    },
    showChangePasswordModal: (state) => {
      state.changePasswordModalState = true;
    },
  },
});

export const selectChangePasswordModalState = (state: RootState) => state.profile.changePasswordModalState;

export const { closeChangePasswordModal, showChangePasswordModal } = profileSlice.actions;
export default profileSlice.reducer;
