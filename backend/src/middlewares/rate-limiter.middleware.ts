import rateLimit from "express-rate-limit";
import config from "../config";

export const publicApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again later.",
  skip: () => config.ENV === "development",
});

export const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many authentication attempts from this IP. Please try again later.",
  skip: () => config.ENV === "development",
});
