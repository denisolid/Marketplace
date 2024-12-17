import express from "express";
import {
  register,
  login,
  googleAuth,
  logout,
} from "../controllers/auth.controller.js";
import { validateRegister, validateLogin } from "../middleware/validators.js";
import { protect } from "../middleware/validators/auth.validator.js";

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/google/callback", googleAuth);
router.post("/logout", protect, logout);
export default router;
