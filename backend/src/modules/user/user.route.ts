import { Router } from "express";
import userController from "./user.controller";
import authorize from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validation.middleware";
import { updateUserSchema } from "./user.schema";

const userRouter = Router();

userRouter.get("/", authorize, userController.getAllUsers);
userRouter.get("/unconnected", authorize, userController.getUnconnectedUsers);
userRouter.get("/connected", authorize, userController.getConnectedUsers);
userRouter
  .route("/profile")
  .get(authorize, userController.getUserProfile)
  .patch(authorize, validate(updateUserSchema, "body"), userController.updateUserProfile);

export default userRouter;
