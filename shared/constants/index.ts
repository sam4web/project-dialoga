export const COPYRIGHT_YEAR = new Date().getFullYear();

export const API_TIMEOUT_MS = 30000;

export const FILE_UPLOAD_CONSTANTS = {
  MAX_SIZE_BYTES: 1 * 1024 * 1024, // 1MB
  MAX_SIZE_MB: 1,
  ACCEPTED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/gif"],
};

export enum HTTP_METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS",
}

export enum HTTP_STATUS {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
}
