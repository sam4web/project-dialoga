import { NextFunction, Request, Response } from "express";
import ApiError from "../lib/errors/ApiError";
import logger from "../config/logger";

const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
  logger.error(`Error: ${error.message}`, {
    stack: error.stack,
    path: request.path,
    method: request.method,
    ip: request.ip,
    body: request.body,
    query: request.query,
    params: request.params,
  });

  if (error instanceof ApiError) {
    return response.status(error.statusCode).json({
      success: false,
      message: error.message,
      errors: error.errors,
    });
  } else {
    return response.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
      errors: [error.message],
    });
  }
};

export default errorHandler;
