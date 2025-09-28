import { NextFunction, Request, Response } from "express";
import ApiError from "../lib/errors/ApiError";
import { formatListWithAnd } from "../../../shared/helpers";

const checkFileExists = async (request: Request, response: Response, next: NextFunction) => {
  if (!request.files) {
    return next(ApiError.badRequest("The upload file was not provided."));
  }
  next();
};

const validateFileType = (allowedExtensions: string[]) => {
  return (request: Request, response: Response, next: NextFunction) => {
    const extension = (request as any).files["image"].mimetype;
    if (!allowedExtensions.includes(extension)) {
      const extensions = allowedExtensions.map((type) => type.slice(type.search("/") + 1));
      return next(ApiError.badRequest(`Only ${formatListWithAnd(extensions)} formats are supported.`));
    }
    next();
  };
};

const validateFileSize = (maxFileSizeBytes: number) => {
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

export { checkFileExists, validateFileType, validateFileSize };
