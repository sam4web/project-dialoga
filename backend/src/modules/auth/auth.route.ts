import { Router } from "express";
import { validate } from "../../middlewares/validation.middleware";
import { loginSchema, registerSchema } from "./auth.schema";
import authController from "./auth.controller";

const authRouter = Router();

authRouter.post("/login", validate(loginSchema, "body"), authController.login);
authRouter.post("/register", validate(registerSchema, "body"), authController.register);
authRouter.post("/refresh", validate(registerSchema, "body"), authController.refresh);

export default authRouter;
