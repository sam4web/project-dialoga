import { configureStore } from "@reduxjs/toolkit";
import config from "@/config";
import { rootReducer } from "./reducer";

export const store = configureStore({
  reducer: rootReducer,
  devTools: config.VITE_ENV === "development",
});
