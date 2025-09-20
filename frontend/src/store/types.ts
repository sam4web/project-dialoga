import { RootState, AppDispatch } from "./index";

export interface ThunkApiConfig {
  state: RootState;
  dispatch: AppDispatch;
}
