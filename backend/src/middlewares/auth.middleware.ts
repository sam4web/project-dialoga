import { NextFunction, Request, Response } from "express";
import ApiError from "../lib/errors/ApiError";
import { verifyToken } from "../lib/auth/jwt";
import config from "../config";
import mongoose from "mongoose";
import User from "../database/models/User";

const authorize = async (request: Request, response: Response, next: NextFunction) => {
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

export default authorize;
