import { RootState, AppDispatch } from "./store";

export interface ThunkApiConfig {
  state: RootState;
  dispatch: AppDispatch;
}
