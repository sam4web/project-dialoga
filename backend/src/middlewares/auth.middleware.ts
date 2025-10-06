import { NextFunction, Request, Response } from "express";
import { validateAccessToken } from "../lib";

export const authorize = async (request: Request, response: Response, next: NextFunction) => {
  const token = request.headers.authorization;
  try {
    const userId = await validateAccessToken(token || "");
    (request as any).userId = userId;
    next();
  } catch (error) {
    next(error);
  }
};
