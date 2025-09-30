import { NextFunction, Request, Response } from "express";
import { formatListWithAnd } from "../../../shared/helpers";
import { ApiError } from "../lib";

export const checkFileExists = (fieldname: string) => {
  return (request: Request, response: Response, next: NextFunction) => {
    if (!request.files || !(request as any).files[fieldname]) {
      return next(ApiError.badRequest("Expected file in request payload, but none was received."));
    }
    if (Array.isArray((request as any).files[fieldname])) {
      return next(ApiError.badRequest("Expected a single file, but multiple were received."));
    }
    next();
  };
};

export const validateFileType = (allowedExtensions: string[]) => {
  return (request: Request, response: Response, next: NextFunction) => {
    const extension = (request as any).files["image"].mimetype;
    if (!allowedExtensions.includes(extension)) {
      const extensions = allowedExtensions.map((type) => type.slice(type.search("/") + 1));
      return next(ApiError.badRequest(`Only ${formatListWithAnd(extensions)} formats are supported.`));
    }
    next();
  };
};

export const validateFileSize = (maxFileSizeBytes: number) => {
  return (request: Request, response: Response, next: NextFunction) => {
    const fileSize = (request as any).files["image"].size;
    if (fileSize > maxFileSizeBytes) {
      return next(
        ApiError.badRequest(`File size exceeds limit. Maximum allowed size is ${maxFileSizeBytes / 1024 / 1024}MB.`)
      );
    }
    next();
  };
};
