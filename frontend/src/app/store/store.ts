import { configureStore } from "@reduxjs/toolkit";
import { profileReducer } from "@/features/profile/slice";
import { authReducer } from "@/features/auth/slice";
import { chatReducer } from "@/features/chat/slice";
import { errorReducer, themeReducer } from "@/app/slices";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    error: errorReducer,
    profile: profileReducer,
    auth: authReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
