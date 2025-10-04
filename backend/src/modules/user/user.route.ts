import { Router } from "express";
import { authorize, imageFileMiddleware, validate } from "../../middlewares";
import userController from "./user.controller";
import { getPublicProfileSchema, updateUserSchema } from "./user.schema";

const userRouter = Router();

userRouter.use(authorize);
userRouter.get("/", userController.getAllUsers);
userRouter.get("/unassociated", userController.getUnassociatedUsers);
userRouter.get("/partner", userController.getChatPartners);
userRouter
  .route("/me")
  .get(userController.getCurrentUserProfile)
  .patch(validate(updateUserSchema, "body"), userController.updateUserProfile);
userRouter.patch("/me/image", imageFileMiddleware, userController.updateUserProfileImage);
userRouter.get("/:id", validate(getPublicProfileSchema, "params"), userController.getPublicProfile);

export default userRouter;
