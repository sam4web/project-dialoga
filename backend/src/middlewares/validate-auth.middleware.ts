import { NextFunction, Request, Response } from "express";
import { validateEmail, validatePassword, validateUsername } from "../lib/helpers/validate";

export const validateRegister = (request: Request, response: Response, next: NextFunction) => {
  const usernameValid = validateUsername(request.body?.username?.trim() || "");
  const emailValid = validateEmail(request.body?.email?.trim() || "");
  const passwordValid = validatePassword(request.body?.password?.trim() || "");

  if (![usernameValid, emailValid, passwordValid].every((field) => field.isValid)) {
    response.json({ message: usernameValid.message || emailValid.message || passwordValid.message });
    return;
  }

  next();
};

export const validateLogin = (request: Request, response: Response, next: NextFunction) => {
  const emailValid = validateEmail(request.body?.email?.trim() || "");
  const passwordValid = validateEmail(request.body?.email?.trim() || "");

  if (![emailValid, passwordValid].every((field) => field.isValid)) {
    response.json({ message: emailValid.message || passwordValid.message });
    return;
  }

  next();
};
