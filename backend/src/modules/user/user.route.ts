import { Router } from "express";
import userController from "./user.controller";
import authorize from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validation.middleware";
import { updateUserSchema } from "./user.schema";
import fileUpload from "express-fileupload";
import { FILE_UPLOAD_CONSTANTS } from "../../../../shared/constants";
import { checkFileExists, validateFileSize, validateFileType } from "../../middlewares/file.middleware";

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
userRouter.get("/profile/:id", userController.getPublicProfile);
userRouter
  .route("/me")
  .get(userController.getCurrentUserProfile)
  .patch(validate(updateUserSchema, "body"), userController.updateUserProfile);
userRouter.patch("/me/image", updateProfileImageMiddleware, userController.updateUserProfileImage);

export default userRouter;
