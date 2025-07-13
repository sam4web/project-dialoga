import { Request, Response } from "express";

// @route /api/auth/login
// @method POST
export const login = async (request: Request, response: Response) => {
  response.status(200).json({ message: "login" });
};

// @route /api/auth/register
// @method POST
export const register = async (request: Request, response: Response) => {
  response.status(200).json({ message: "register" });
};

// @route /api/auth/refresh
// @method POST
export const refreshToken = async (request: Request, response: Response) => {
  response.status(200).json({ message: "refresh-token" });
};

// @route /api/auth/logout
// @method POST
export const logout = async (request: Request, response: Response) => {
  response.status(200).json({ message: "logout" });
};
