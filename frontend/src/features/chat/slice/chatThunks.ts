import { ThunkApiConfig } from "@/app/store";
import { handleApiError } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getConnectedUsersApi, getUnconnectedUsersApi, startNewConversationApi } from "../api";
import { IConnectedUser, IUserProfile, IStartConversationRequestDTO } from "@shared/types";

export const fetchConnectedUsers = createAsyncThunk<IConnectedUser[], void, ThunkApiConfig>(
  "chat/getConnectedUsers",
  async (_, { getState, rejectWithValue }) => {
    try {
      const connectedUsers = await getConnectedUsersApi(getState);
      return connectedUsers;
    } catch (error) {
      return rejectWithValue(handleApiError(error, "Could not load your active conversations. Please try again."));
    }
  }
);

export const fetchUnconnectedUsers = createAsyncThunk<IUserProfile[], void, ThunkApiConfig>(
  "chat/getUnconnectedUsers",
  async (_, { getState, rejectWithValue }) => {
    try {
      const unconnectedUsers = await getUnconnectedUsersApi(getState);
      return unconnectedUsers;
    } catch (error) {
      return rejectWithValue(handleApiError(error, "Could not load your active conversations. Please try again."));
    }
  }
);

export const sendStartNewConversationRequest = createAsyncThunk<
  IConnectedUser,
  IStartConversationRequestDTO,
  ThunkApiConfig
>("chat/startNewConversation", async ({ receiverId, initialMessage }, { getState, rejectWithValue }) => {
  try {
    const userProfile = await startNewConversationApi({ receiverId, initialMessage }, getState);
    return userProfile;
  } catch (error) {
    return rejectWithValue(handleApiError(error, "Could not load your active conversations. Please try again."));
  }
});
