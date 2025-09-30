import { ThunkApiConfig } from "@/app/store";
import { handleApiError } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getConnectedUsersApi, getUnConnectedUsersApi } from "../api";
import { IConnectedUser, IUserProfile } from "@shared/types/user";

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
      const unconnectedUsers = await getUnConnectedUsersApi(getState);
      return unconnectedUsers;
    } catch (error) {
      return rejectWithValue(handleApiError(error, "Could not load your active conversations. Please try again."));
    }
  }
);
