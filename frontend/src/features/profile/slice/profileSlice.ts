import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  fetchCurrentUserProfile,
  sendUpdateUserProfileImageRequest,
  sendUpdateUserProfileRequest,
} from "./profileThunks";
import { IUserProfile } from "../types";
import { RootState } from "@/app/store";

interface ProfileState {
  userProfile: IUserProfile | null;
}

const initialState: ProfileState = {
  userProfile: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        fetchCurrentUserProfile.fulfilled,
        sendUpdateUserProfileRequest.fulfilled,
        sendUpdateUserProfileImageRequest.fulfilled
      ),
      (state, action) => {
        state.userProfile = action.payload;
      }
    );
  },
});

export const selectUserData = (state: RootState) => state.profile.userProfile;
export const isProfileLoaded = (state: RootState) => {
  if (!state.profile.userProfile) return false;
  return Object.keys(state.profile.userProfile).length > 0;
};

export const profileReducer = profileSlice.reducer;
