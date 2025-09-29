export const COPYRIGHT_YEAR = new Date().getFullYear();

export const API_TIMEOUT_MS = 30000;

export const FILE_UPLOAD_CONSTANTS = {
  MAX_SIZE_BYTES: 2 * 1024 * 1024, // 2MB
  MAX_SIZE_MB: 2,
  ACCEPTED_FILE_TYPES: ["image/jpg", "image/jpeg", "image/png", "image/webp"],
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
