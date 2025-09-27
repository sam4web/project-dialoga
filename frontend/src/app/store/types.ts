import { appReducer, store } from ".";

export type RootState = ReturnType<typeof appReducer>;
export type AppDispatch = typeof store.dispatch;

export interface ThunkApiConfig {
  state: RootState;
  dispatch: AppDispatch;
}
