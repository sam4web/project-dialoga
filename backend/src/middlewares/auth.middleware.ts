import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { ApiError, verifyToken } from "../lib";
import { config } from "../config";
import { User } from "../database";

export const authorize = async (request: Request, response: Response, next: NextFunction) => {
  const token = request.headers.authorization;
  if (!token || !token.includes("Bearer ")) {
    return next(ApiError.unauthorized("Unauthorized: Access is denied due to invalid credentials."));
  }
  const authToken = token.replace("Bearer ", "");
  const { id: decodedId } = verifyToken(authToken, config.ACCESS_TOKEN_SECRET);
  if (!decodedId || !mongoose.Types.ObjectId.isValid(decodedId)) {
    return next(ApiError.unauthorized("Unauthorized: Access is denied due to invalid credentials."));
  }
  const user = await User.findById(decodedId).lean();
  if (!user) {
    return next(ApiError.unauthorized("Unauthorized: Access is denied due to invalid credentials."));
  }
  (request as any).userId = decodedId;
  next();
};
