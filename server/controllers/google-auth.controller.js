import { asyncHandler } from "../utils/asyncHandler.js";
import { GoogleAuthService } from "../services/google-auth.service.js";
import { COOKIE_CONFIG } from "../config/cookie.js";
import { logger } from "../config/logger.js";

export const handleGoogleCallback = asyncHandler(async (req, res) => {
  const { code } = req.body;

  if (!code) {
    logger.error("Missing authorization code in request");
    res.status(400);
    throw new Error("Authorization code is required");
  }

  try {
    const { user, token } = await GoogleAuthService.handleCallback(code);

    // Set auth token in HTTP-only cookie
    res.setSecureCookie(COOKIE_CONFIG.token.name, token);

    logger.success(`User authenticated via Google: ${user.email}`);

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
  } catch (error) {
    logger.error("Google auth callback failed:", {
      error: error.message,
      code: error.code,
      status: error.status,
    });

    res.status(500).json({
      status: "error",
      message: "Google authentication failed",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});
