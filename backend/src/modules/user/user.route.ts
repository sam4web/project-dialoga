import { Router } from "express";
import userController from "./user.controller";
import authorize from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validation.middleware";
import { updateUserSchema } from "./user.schema";

const userRoutes = Router();

userRoutes.get("/", authorize, userController.getAllUsers);
userRoutes
  .route("/profile")
  .get(authorize, userController.getUserProfile)
  .patch(authorize, validate(updateUserSchema, "body"), userController.updateUserProfile);

export default userRoutes;
