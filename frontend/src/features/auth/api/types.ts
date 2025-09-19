export type Token = string;

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface LoginApiResponse {
  token: string;
}
