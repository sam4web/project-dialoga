import express from "express";
import { validateLogin, validateRegister } from "../../../middlewares/validate-auth.middleware";
import { register, login, logout, refreshToken } from "../controllers/auth.controller";

const router = express.Router();

// @route /api/auth/login
// @method POST
router.post("/login", validateLogin, login);

// @route /api/auth/register
// @method POST
router.post("/register", validateRegister, register);

// @route /api/auth/refresh
// @method POST
router.post("/refresh", refreshToken);

// @route /api/auth/logout
// @method POST
router.post("/logout", logout);

export default router;
