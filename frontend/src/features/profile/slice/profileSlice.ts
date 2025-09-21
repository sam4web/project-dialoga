import { RootState } from "@/store";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchUserProfile, sendUpdateUserProfileRequest } from "./profileThunks";
import { IUser } from "../types";

interface ProfileState {
  updateProfileImageModalState: boolean;
  userProfile: IUser | null;
}

const initialState: ProfileState = {
  updateProfileImageModalState: false,
  userProfile: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
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

export const selectUpdateProfileImageModalState = (state: RootState) => state.profile.updateProfileImageModalState;
export const selectUserData = (state: RootState) => state.profile.userProfile;
export const isProfileLoaded = (state: RootState) => {
  if (!state.profile.userProfile) return false;
  return Object.keys(state.profile.userProfile).length > 0;
};

export const { closeUpdateProfileImageModal, showUpdateProfileImageModal } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
