import { HTTP_STATUS } from "../../../../shared/constants/index";
class ApiError extends Error {
  public statusCode: number;
  public errors: string[] | object[];

  constructor(statusCode: number, message: string, errors: string[] | object[] = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string, errors?: string[] | object[]): ApiError {
    return new ApiError(HTTP_STATUS.BAD_REQUEST, message, errors);
  }

  static unauthorized(message: string): ApiError {
    return new ApiError(HTTP_STATUS.UNAUTHORIZED, message);
  }

  static forbidden(message: string): ApiError {
    return new ApiError(HTTP_STATUS.FORBIDDEN, message);
  }

  static notFound(message: string): ApiError {
    return new ApiError(HTTP_STATUS.NOT_FOUND, message);
  }

  static internal(message: string, errors?: string[] | object[]): ApiError {
    return new ApiError(HTTP_STATUS.INTERNAL_SERVER_ERROR, message, errors);
  }
}

export default ApiError;
