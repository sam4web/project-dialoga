export type RegisterUserProps = {
  username: string;
  email: string;
  password: string;
};

export type LoginUserProps = { email: string; password: string };

export type TokenReturnType = Promise<{
  accessToken: string;
  refreshToken: string;
}>;
