import express from "express";
import { register, login, logout } from "../controllers/auth.controller.js";
import { validateRegister, validateLogin } from "../middleware/validators.js";
import { protect } from "../middleware/validators/auth.validator.js";
import { handleGoogleCallback } from "../controllers/google-auth.controller.js";
const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/google/callback", handleGoogleCallback);
router.post("/logout", protect, logout);
router.get("/test", (req, res) => {
  res.json({ message: "Auth routes are working" });
});
export default router;
