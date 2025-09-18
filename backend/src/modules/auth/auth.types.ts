import { ICreateUserDTO } from "../../database/types/UserTypes";

export interface IRegisterDTO extends ICreateUserDTO {}

export interface ILoginDTO {
  email: string;
  password: string;
}

export interface IChangePassReqDTO {
  currentPassword: string;
  newPassword: string;
}

export interface IChangePassServiceDTO extends IChangePassReqDTO {
  userId: string;
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
}
