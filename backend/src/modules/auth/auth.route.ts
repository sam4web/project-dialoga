import { Router } from "express";
import { validate } from "../../middlewares/validation.middleware";
import authorize from "../../middlewares/auth.middleware";
import { changePasswordSchema, loginSchema, registerSchema } from "./auth.schema";
import authController from "./auth.controller";

const authRouter = Router();

authRouter.post("/login", validate(loginSchema, "body"), authController.login);
authRouter.post("/register", validate(registerSchema, "body"), authController.register);
authRouter.patch("/change-password", authorize, validate(changePasswordSchema, "body"), authController.changePassword);
authRouter.post("/refresh", authController.refresh);
authRouter.post("/logout", authController.logout);

export default authRouter;
