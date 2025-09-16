import { IUser } from "../../database/models/User";
import jwt from "jsonwebtoken";
import ApiError from "../errors/ApiError";
import ms from "ms";

interface IJwtPayload {
  id: string;
  email: string;
}

export const generateToken = (payload: IJwtPayload, secret: string, expiresIn: string = "1h"): string => {
  try {
    return jwt.sign(payload, secret, { expiresIn: expiresIn as ms.StringValue });
  } catch (error) {
    throw ApiError.internal("Failed to generate authentication token.");
  }
};

export const verifyToken = (token: string, secret: string): IJwtPayload => {
  try {
    const payload = jwt.verify(token, secret) as IJwtPayload;
    return payload;
  } catch (error) {
    throw ApiError.unauthorized("Invalid or expired token.");
  }
};
