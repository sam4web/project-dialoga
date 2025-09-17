import { NextFunction, Request, Response } from "express";
import { ZodError, ZodType } from "zod";
import ApiError from "../lib/errors/ApiError";

export const validate = (schema: ZodType, source: "body" | "query" | "params" = "body") => {
  return (request: Request, response: Response, next: NextFunction) => {
    try {
      const parsedData = schema.parse(request[source]);
      (request as any)[`validated${source.charAt(0).toUpperCase() + source.slice(1)}`] = parsedData;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = error.issues.map((err) => err.message).join("\n");
        next(ApiError.badRequest(errorMessage));
      } else {
        next(ApiError.internal("An unexpected validation error occurred."));
      }
    }
  };
};
