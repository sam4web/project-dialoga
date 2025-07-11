export const COPYRIGHT_YEAR = new Date().getFullYear();

export const API_TIMEOUT_MS = 30000;

export const MAX_FILE_UPLOAD_SIZE_MB = 5;

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}
