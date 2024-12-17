import { body } from "express-validator";
import { validate } from "../../utils/validation.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { AuthService } from "../../services/auth.service.js";
import User from "../../models/User.js";

export const registerValidator = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email address"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),

  validate,
];

export const loginValidator = [
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email address"),

  body("password").notEmpty().withMessage("Password is required"),

  validate,
];

export const protect = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401);
    throw new Error("Not authorized - No token provided");
  }

  // Check if token is blacklisted
  if (AuthService.isTokenBlacklisted(token)) {
    res.status(401);
    throw new Error("Not authorized - Token is invalid");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized - Invalid token");
  }
});
