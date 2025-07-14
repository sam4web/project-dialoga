import express from "express";
import { login, logout, refreshToken, register } from "../contollers/auth.controller";
import { validateRegister, validateLogin } from "../middlewares/validate-auth.middleware";

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
