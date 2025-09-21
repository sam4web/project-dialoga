import { RootState } from "@/store";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchUserProfile, sendUpdateUserProfileRequest } from "./profileThunks";
import { IUser } from "../types";

interface ProfileState {
  changePasswordModalState: boolean;
  updateProfileImageModalState: boolean;
  userProfile: IUser | null;
}

const initialState: ProfileState = {
  changePasswordModalState: false,
  updateProfileImageModalState: false,
  userProfile: null,
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
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(fetchUserProfile.fulfilled, sendUpdateUserProfileRequest.fulfilled), (state, action) => {
      state.userProfile = action.payload;
    });
  },
});

export const selectChangePasswordModalState = (state: RootState) => state.profile.changePasswordModalState;
export const selectUpdateProfileImageModalState = (state: RootState) => state.profile.updateProfileImageModalState;
export const selectUserData = (state: RootState) => state.profile.userProfile;

export const {
  closeChangePasswordModal,
  showChangePasswordModal,
  closeUpdateProfileImageModal,
  showUpdateProfileImageModal,
} = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
