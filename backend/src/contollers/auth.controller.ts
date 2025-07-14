import { Request, Response } from "express";
import { registerUser, loginUser, refreshAccessToken } from "../services/auth.service";
import ms from "ms";
import ApiError from "../lib/utils/api-error";

// @route /api/auth/login
// @method POST
export const login = async (request: Request, response: Response) => {
  const { username, password } = request.body;
  if (!username || !password) {
    response.status(400).json({ error: "All fields are required" });
    return;
  }

  try {
    const { accessToken, refreshToken } = await loginUser({ username, password });

    // add refresh token on response cookie
    response.cookie("token", refreshToken, {
      httpOnly: true,
      maxAge: ms(process.env.REFRESH_TOKEN_EXPIRY_TIME as ms.StringValue),
      sameSite: process.env.NODE_ENV === "development" ? "strict" : "none",
      secure: process.env.NODE_ENV !== "development",
    });

    response.status(200).json(accessToken);
    return;
  } catch (error) {
    if (error instanceof Error) {
      const statusCode = error instanceof ApiError ? error.statusCode : 400;
      response.status(statusCode).json({ message: error.message, isError: true });
      return;
    }
  }
};

// @route /api/auth/register
// @method POST
export const register = async (request: Request, response: Response) => {
  const { username, email, password } = request.body;
  if (!username || !email || !password) {
    response.status(400).json({ error: "All fields are required" });
    return;
  }

  try {
    const { accessToken, refreshToken } = await registerUser({ username, email, password });

    // add refresh token on response cookie
    response.cookie("token", refreshToken, {
      httpOnly: true,
      maxAge: ms(process.env.REFRESH_TOKEN_EXPIRY_TIME as ms.StringValue),
      sameSite: process.env.NODE_ENV === "development" ? "strict" : "none",
      secure: process.env.NODE_ENV !== "development",
    });

    response.status(200).json(accessToken);
    return;
  } catch (error) {
    if (error instanceof Error) {
      const statusCode = error instanceof ApiError ? error.statusCode : 400;
      response.status(statusCode).json({ message: error.message, isError: true });
      return;
    }
  }
};

// @route /api/auth/refresh
// @method POST
export const refreshToken = async (request: Request, response: Response) => {
  const token = request.cookies?.token;
  if (!token) {
    response.status(401).json({ message: "Refresh token must be provided.", isError: true });
    return;
  }

  try {
    const { accessToken, refreshToken } = await refreshAccessToken(token);

    // add refresh token on response cookie
    response.cookie("token", refreshToken, {
      httpOnly: true,
      maxAge: ms(process.env.REFRESH_TOKEN_EXPIRY_TIME as ms.StringValue),
      sameSite: process.env.NODE_ENV === "development" ? "strict" : "none",
      secure: process.env.NODE_ENV !== "development",
    });
    response.status(200).json(accessToken);
    return;
  } catch (error) {
    if (error instanceof Error) {
      const statusCode = error instanceof ApiError ? error.statusCode : 400;
      response.status(statusCode).json({ message: error.message, isError: true });
      return;
    }
  }
};

// @route /api/auth/logout
// @method POST
export const logout = async (request: Request, response: Response) => {
  try {
    // remove refresh token on response cookie
    response.clearCookie("token", {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "development" ? "strict" : "none",
      secure: process.env.NODE_ENV !== "development",
    });
    response.status(200);
    response.end();
    return;
  } catch (error) {
    if (error instanceof Error) {
      const statusCode = error instanceof ApiError ? error.statusCode : 400;
      response.status(statusCode).json({ message: error.message, isError: true });
      return;
    }
  }
};
