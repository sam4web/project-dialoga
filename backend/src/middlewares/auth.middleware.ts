import { NextFunction, Request, Response } from "express";
import ApiError from "../lib/errors/ApiError";
import { verifyToken } from "../lib/auth/jwt";
import config from "../config";

const authorize = (request: Request, response: Response, next: NextFunction) => {
  const token = request.headers.authorization;
  if (!token || !token.includes("Bearer ")) {
    next(ApiError.unauthorized("Unauthorized: Access is denied due to invalid credentials."));
    return;
  }
  const authToken = token.replace("Bearer ", "");
  const decoded = verifyToken(authToken, config.ACCESS_TOKEN_SECRET);
  (request as any).userId = decoded.id;
  next();
};

export default authorize;
