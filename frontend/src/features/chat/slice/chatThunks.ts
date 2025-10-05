import { ThunkApiConfig } from "@/app/store";
import { handleApiError } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getChatPartnersApi,
  getConversationMessagesApi,
  getRecipientProfileApi,
  getUnassociatedUsersApi,
  sendImageMessageApi,
  sendTextMessageApi,
  startNewConversationApi,
} from "../api";
import { IChatPartner, IUserProfile, IStartConversationRequestDTO, IMessage } from "@shared/types";
import { ISendImageMessage, ISendTextMessage } from "../types";

export const fetchChatPartners = createAsyncThunk<IChatPartner[], void, ThunkApiConfig>(
  "chat/getConnectedUsers",
  async (_, { getState, rejectWithValue }) => {
    try {
      const connectedUsers = await getChatPartnersApi(getState);
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
      return rejectWithValue(handleApiError(error, "Failed to retrieve the list of users. Please try again."));
    }
  }
);

export const fetchRecipientProfile = createAsyncThunk<IUserProfile, string, ThunkApiConfig>(
  "chat/getRecipientProfile",
  async (conversationId, { getState, rejectWithValue }) => {
    try {
      const recipientProfile = await getRecipientProfileApi(conversationId, getState);
      return recipientProfile;
    } catch (error) {
      return rejectWithValue(handleApiError(error, "Failed to load recipient profile. Please try again."));
    }
  }
);

export const sendStartNewConversationRequest = createAsyncThunk<
  IChatPartner,
  IStartConversationRequestDTO,
  ThunkApiConfig
>("chat/startNewConversation", async ({ receiverId, initialMessage }, { getState, rejectWithValue }) => {
  try {
    const recipient = await startNewConversationApi({ receiverId, initialMessage }, getState);
    return recipient;
  } catch (error) {
    return rejectWithValue(
      handleApiError(error, "Failed to start new conversation. Please try selecting the user again.")
    );
  }
});

export const fetchConversationMessages = createAsyncThunk<IMessage[], string, ThunkApiConfig>(
  "chat/getConversationMessages",
  async (conversationId, { getState, rejectWithValue }) => {
    try {
      const recipientProfile = await getConversationMessagesApi(conversationId, getState);
      return recipientProfile;
    } catch (error) {
      return rejectWithValue(handleApiError(error, "Error loading messages. Could not retrieve conversation history."));
    }
  }
);

export const sendTextMessageReqest = createAsyncThunk<IMessage, ISendTextMessage, ThunkApiConfig>(
  "chat/sendTextMessage",
  async ({ conversationId, message }, { getState, rejectWithValue }) => {
    try {
      const messageData = await sendTextMessageApi({ conversationId, message }, getState);
      return messageData;
    } catch (error) {
      return rejectWithValue(handleApiError(error, "Message failed to send. Please try submitting again."));
    }
  }
);

export const sendImageMessageReqest = createAsyncThunk<IMessage, ISendImageMessage, ThunkApiConfig>(
  "chat/sendImageMessage",
  async ({ conversationId, message }, { getState, rejectWithValue }) => {
    try {
      const messageData = await sendImageMessageApi({ conversationId, message }, getState);
      return messageData;
    } catch (error) {
      return rejectWithValue(handleApiError(error, "Image failed to upload. Unable to send the file at this time."));
    }
  }
);
