import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchUserProfile, sendUpdateUserProfileImageRequest, sendUpdateUserProfileRequest } from "./profileThunks";
import { IUser } from "../types";
import { RootState } from "@/app/store";

interface ProfileState {
  userProfile: IUser | null;
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
        fetchUserProfile.fulfilled,
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
