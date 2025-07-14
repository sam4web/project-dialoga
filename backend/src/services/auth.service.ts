import { type IUser } from "../types/models";
import jwt from "jsonwebtoken";
import ms from "ms";
import User from "../models/user.model";
import { LoginUserProps, RegisterUserProps, TokenReturnType } from "../types/services";
import ApiError from "../lib/utils/api-error";

export const loginUser = async ({ username, password }: LoginUserProps): TokenReturnType => {
  const user = await User.findOne({ username });
  if (!user) throw new ApiError("User with provided username does not exists.", 404);
  const doesPassMatch = await user.doesPasswordMatch(password);
  if (!doesPassMatch) throw new Error("Password does not match.");
  // generate new access and refresh token
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  return { accessToken, refreshToken };
};

export const registerUser = async ({ username, email, password }: RegisterUserProps): TokenReturnType => {
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (existingUser) throw new Error("Email or username already in use.");
  const user = await User.create({ username, email, password });
  // generate new access and refresh token
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  return { accessToken, refreshToken };
};

export const refreshAccessToken = async (token: string): TokenReturnType => {
  try {
    const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as jwt.Secret);
    if (!(typeof decodedToken === "object" && "UserData" in decodedToken)) {
      throw new Error("Invalid token format");
    }
    const user = await User.findById(decodedToken.UserData.id);
    if (!user) throw new ApiError("User does not exists.", 404);
    // generate new access and refresh token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error(error as string);
  }
};

export const generateAccessToken = (user: IUser) => {
  return jwt.sign(
    {
      UserData: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    },
    process.env.ACCESS_TOKEN_SECRET as jwt.Secret,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY_TIME as ms.StringValue }
  );
};

export const generateRefreshToken = (user: IUser) => {
  return jwt.sign(
    {
      UserData: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    },
    process.env.REFRESH_TOKEN_SECRET as jwt.Secret,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY_TIME as ms.StringValue }
  );
};
