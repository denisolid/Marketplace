import { AuthService } from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { logger } from "../config/logger.js";
import { COOKIE_CONFIG } from "../config/cookie.js";

export const register = asyncHandler(async (req, res) => {
  const { user, token } = await AuthService.register(req.body);

  res.setSecureCookie(COOKIE_CONFIG.token.name, token);

  logger.success(`User registered successfully: ${user.email}`);

  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    },
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await AuthService.login(email, password);

  res.setSecureCookie(COOKIE_CONFIG.token.name, token);

  logger.success(`User logged in successfully: ${user.email}`);

  res.json({
    status: "success",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    },
  });
});

export const logout = asyncHandler(async (req, res) => {
  res.clearSecureCookie(COOKIE_CONFIG.token.name);
  logger.info("User logged out successfully");

  res.json({
    status: "success",
    message: "Logged out successfully",
  });
});
