import { ThunkApiConfig } from "@/app/store";
import { handleApiError } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getConversationRecipientsApi, getUnassociatedUsersApi, startNewConversationApi } from "../api";
import { IConversationRecipient, IUserProfile, IStartConversationRequestDTO } from "@shared/types";

export const fetchConversationRecipients = createAsyncThunk<IConversationRecipient[], void, ThunkApiConfig>(
  "chat/getConnectedUsers",
  async (_, { getState, rejectWithValue }) => {
    try {
      const connectedUsers = await getConversationRecipientsApi(getState);
      return connectedUsers;
    } catch (error) {
      return rejectWithValue(handleApiError(error, "Could not load your active conversations. Please try again."));
    }
  }
);

export const fetchUnassociatedUsers = createAsyncThunk<IUserProfile[], void, ThunkApiConfig>(
  "chat/getUnassociatedUsers",
  async (_, { getState, rejectWithValue }) => {
    try {
      const unassociatedUsers = await getUnassociatedUsersApi(getState);
      return unassociatedUsers;
    } catch (error) {
      return rejectWithValue(handleApiError(error, "Could not load your active conversations. Please try again."));
    }
  }
);

export const sendStartNewConversationRequest = createAsyncThunk<
  IConversationRecipient,
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
