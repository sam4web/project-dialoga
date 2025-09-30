import { Router } from "express";
import fileUpload from "express-fileupload";
import { FILE_UPLOAD_CONSTANTS } from "../../../../shared/constants";
import { authorize, checkFileExists, validate, validateFileSize, validateFileType } from "../../middlewares";
import userController from "./user.controller";
import { getPublicProfileSchema, updateUserSchema } from "./user.schema";

const userRouter = Router();

const updateProfileImageMiddleware = [
  fileUpload({ createParentPath: true }),
  checkFileExists("image"),
  validateFileType(FILE_UPLOAD_CONSTANTS.ACCEPTED_FILE_TYPES),
  validateFileSize(FILE_UPLOAD_CONSTANTS.MAX_SIZE_BYTES),
];

userRouter.use(authorize);
userRouter.get("/", userController.getAllUsers);
userRouter.get("/unconnected", userController.getUnconnectedUsers);
userRouter.get("/connected", userController.getConnectedUsers);
userRouter
  .route("/me")
  .get(userController.getCurrentUserProfile)
  .patch(validate(updateUserSchema, "body"), userController.updateUserProfile);
userRouter.patch("/me/image", updateProfileImageMiddleware, userController.updateUserProfileImage);
userRouter.get("/:id", validate(getPublicProfileSchema, "params"), userController.getPublicProfile);

export default userRouter;
