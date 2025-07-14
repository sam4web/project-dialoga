export type RegisterUserProps = {
  username: string;
  email: string;
  password: string;
};

export type LoginUserProps = { username: string; password: string };

export type TokenReturnType = Promise<{
  accessToken: string;
  refreshToken: string;
}>;
