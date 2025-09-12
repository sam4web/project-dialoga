import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "@/features/theme/slice";
import profileReducer from "@/features/profile/slice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
