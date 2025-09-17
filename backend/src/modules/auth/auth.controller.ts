import { NextFunction, Request, Response } from "express";
import ApiError from "../../lib/errors/ApiError";
import { IChangePassReqDTO, ILoginDTO, IRegisterDTO } from "./auth.types";
import authService from "./auth.service";
import { HTTP_STATUS } from "../../../../shared/constants";
import ms from "ms";
import config from "../../config";

export class AuthController {
  public async login(request: Request, response: Response, next: NextFunction) {
    const credentials: ILoginDTO = (request as any).validatedBody;
    try {
      const { accessToken, refreshToken } = await authService.login(credentials);
      response.cookie("token", refreshToken, {
        httpOnly: true,
        maxAge: ms(config.REFRESH_TOKEN_EXPIRY_TIME as ms.StringValue),
        sameSite: config.ENV === "development" ? "strict" : "none",
        secure: config.ENV !== "development",
      });
      response.status(HTTP_STATUS.OK).json(accessToken);
      return;
    } catch (error) {
      next(error);
    }
  }

  public async register(request: Request, response: Response, next: NextFunction) {
    const credentials: IRegisterDTO = (request as any).validatedBody;
    try {
      const { accessToken, refreshToken } = await authService.register(credentials);
      response.cookie("token", refreshToken, {
        httpOnly: true,
        maxAge: ms(config.REFRESH_TOKEN_EXPIRY_TIME as ms.StringValue),
        sameSite: config.ENV === "development" ? "strict" : "none",
        secure: config.ENV !== "development",
      });
      response.status(HTTP_STATUS.OK).json(accessToken);
      return;
    } catch (error) {
      next(error);
    }
  }

  public async refresh(request: Request, response: Response, next: NextFunction) {
    const token: string = request.cookies?.token;
    if (!token) {
      throw ApiError.unauthorized("Authentication failed: Refresh token not provided.");
    }
    try {
      const { accessToken, refreshToken } = await authService.refresh(token);
      response.cookie("token", refreshToken, {
        httpOnly: true,
        maxAge: ms(config.REFRESH_TOKEN_EXPIRY_TIME as ms.StringValue),
        sameSite: config.ENV === "development" ? "strict" : "none",
        secure: config.ENV !== "development",
      });
      response.status(HTTP_STATUS.OK).json(accessToken);
      return;
    } catch (error) {
      next(error);
    }
  }

  public async logout(request: Request, response: Response, next: NextFunction) {
    try {
      response.clearCookie("token", {
        httpOnly: true,
        sameSite: config.ENV === "development" ? "strict" : "none",
        secure: config.ENV !== "development",
      });
      response.status(HTTP_STATUS.NO_CONTENT);
      response.end();
      return;
    } catch (error) {
      next(error);
    }
  }

  public async changePassword(request: Request, response: Response, next: NextFunction) {
    try {
      const credentials: IChangePassReqDTO = (request as any).validatedBody;
      const userId: string = (request as any).userId;
      await authService.changePassword({ ...credentials, userId });
      response.status(HTTP_STATUS.NO_CONTENT);
      return;
    } catch (error) {
      next(error);
    }
  }
}

const authController = new AuthController();
export default authController;
