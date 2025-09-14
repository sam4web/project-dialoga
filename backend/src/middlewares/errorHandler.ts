import { NextFunction, Request, Response } from "express";
import { logEvents } from "../config/logger";
import ApiError from "../lib/errors/ApiError";

const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
  logEvents(
    `${error.name}: ${error.message}\t${request.method}\t${request.url}\t${request.headers?.origin}`,
    "error.log"
  );
  const statusCode = error instanceof ApiError ? error.statusCode : request.statusCode || 500;
  response.status(statusCode);
  response.json({ message: error.message, isError: true });
  next();
};

export default errorHandler;
