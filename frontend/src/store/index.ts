import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "@/features/theme/slice";
import { profileReducer } from "@/features/profile/slice";
import { authReducer } from "@/features/auth/slice";
import { chatReducer } from "@/features/chat/slice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    profile: profileReducer,
    auth: authReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
