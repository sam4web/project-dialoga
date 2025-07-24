import { RootState } from "@/store";
import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  value: string;
}

const getInitialTheme = (): string => {
  if (typeof window === "undefined") return "light";

  return (
    localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );
};

const initialState: ThemeState = {
  value: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.value = state.value === "dark" ? "light" : "dark";

      if (typeof window !== "undefined") {
        localStorage.setItem("theme", state.value);
      }
    },
  },
});

export const selectCurrentTheme = (state: RootState) => state.theme.value;

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
