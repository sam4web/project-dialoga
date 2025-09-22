import { IUserSettings } from "../../database/types/UserTypes";

export interface IContact {
  fullname: string;
  email: string;
  statusMessage: string;
  settings: IUserSettings;
}
