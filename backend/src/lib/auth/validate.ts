import mongoose from "mongoose";
import ApiError from "../errors/ApiError";
import { verifyToken } from "./jwt";
import { User } from "../../database";
import { config } from "../../config";

export const validateAccessToken = async (token: string) => {
  if (!token || !token.includes("Bearer ")) {
    throw ApiError.unauthorized("Unauthorized: Access is denied due to invalid credentials.");
  }
  const authToken = token.replace("Bearer ", "");
  const { id: decodedId } = verifyToken(authToken, config.ACCESS_TOKEN_SECRET);
  if (!decodedId || !mongoose.Types.ObjectId.isValid(decodedId)) {
    throw ApiError.unauthorized("Unauthorized: Access is denied due to invalid credentials.");
  }
  const user = await User.findById(decodedId).lean();
  if (!user) {
    throw ApiError.unauthorized("Unauthorized: Access is denied due to invalid credentials.");
  }
  return decodedId;
};
