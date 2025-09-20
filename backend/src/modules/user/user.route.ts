import { Router } from "express";
import userController from "./user.controller";
import authorize from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validation.middleware";
import { updateUserSchema } from "./user.schema";

const userRoutes = Router();

userRoutes.get("/", authorize, userController.getAllUsers);
userRoutes.get("/profile", authorize, userController.getUserProfile);
userRoutes.patch("/profile/update", authorize, validate(updateUserSchema, "body"), userController.updateUserProfile);

export default userRoutes;
