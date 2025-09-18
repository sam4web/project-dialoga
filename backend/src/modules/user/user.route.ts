import { Router } from "express";
import userController from "./user.controller";
import authorize from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validation.middleware";
import { updateUserParamSchema, updateUserSchema } from "./user.schema";

const userRoutes = Router();

userRoutes.get("/", authorize, userController.getAllUsers);
userRoutes.patch(
  "/:userId",
  authorize,
  validate(updateUserParamSchema, "params"),
  validate(updateUserSchema, "body"),
  userController.updateUser
);

export default userRoutes;
