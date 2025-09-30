import { NextFunction, Request, Response } from "express";
import { ApiError } from "../lib";
import { logger } from "../config";

export const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof ApiError) {
    logger.warn(`API Error: ${error.message}`, { path: request.path, status: error.statusCode });
    response.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
    return;
  }

  logger.error(`Internal Server Error: ${error.message}`, {
    path: request.path,
    method: request.method,
    stack: error.stack,
  });

  response.status(500).json({
    success: false,
    message: "An unexpected error occurred. Please try again later.",
  });
};
