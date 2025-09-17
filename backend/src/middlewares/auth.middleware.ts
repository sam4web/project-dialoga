import { NextFunction, Request, Response } from "express";

const authenticate = (request: Request, response: Response, next: NextFunction) => {
  next();
};

export default authenticate;
