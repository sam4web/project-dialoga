export type Token = string;

export interface ILoginRequestDTO {
  email: string;
  password: string;
}

export interface IRegisterRequestDTO {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IApiResponse {
  token: Token;
}
