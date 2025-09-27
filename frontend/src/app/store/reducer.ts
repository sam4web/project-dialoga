import { Action, combineReducers } from "@reduxjs/toolkit";
import { errorReducer, themeReducer } from "../slices";
import { profileReducer } from "@/features/profile/slice";
import { authReducer } from "@/features/auth/slice";
import { chatReducer } from "@/features/chat/slice";
import { RootState } from "./types";

export const appReducer = combineReducers({
  theme: themeReducer,
  error: errorReducer,
  profile: profileReducer,
  auth: authReducer,
  chat: chatReducer,
});

export const rootReducer = (state: RootState | undefined, action: Action) => {
  console.log(action.type);
  if (action.type === "auth/signout/fulfilled") {
    const globalStateToPreserve = state ? { theme: state.theme } : {};
    return appReducer(globalStateToPreserve as RootState, action);
  }
  return appReducer(state, action);
};
