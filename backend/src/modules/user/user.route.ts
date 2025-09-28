import { Router } from "express";
import userController from "./user.controller";
import authorize from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validation.middleware";
import { updateUserSchema } from "./user.schema";
import fileUpload from "express-fileupload";
import { FILE_UPLOAD_CONSTANTS } from "../../../../shared/constants";
import { checkFileExists, validateFileSize, validateFileType } from "../../middlewares/file.middleware";

const userRouter = Router();

userRouter.use(authorize);
userRouter.get("/", userController.getAllUsers);
userRouter.get("/unconnected", userController.getUnconnectedUsers);
userRouter.get("/connected", userController.getConnectedUsers);
userRouter
  .route("/profile")
  .get(userController.getUserProfile)
  .patch(validate(updateUserSchema, "body"), userController.updateUserProfile);
userRouter.patch(
  "/profile/image",
  fileUpload({ createParentPath: true }),
  checkFileExists,
  validateFileType(FILE_UPLOAD_CONSTANTS.ACCEPTED_FILE_TYPES),
  validateFileSize(FILE_UPLOAD_CONSTANTS.MAX_SIZE_BYTES),
  userController.updateUserProfileImage
);

export default userRouter;
