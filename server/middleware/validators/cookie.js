import cookieParser from "cookie-parser";
import { COOKIE_CONFIG } from "../../config/cookie.js";

export const configureCookieMiddleware = (app) => {
  // Use cookie-parser middleware
  app.use(cookieParser());

  // Add cookie helper methods
  app.use((req, res, next) => {
    // Set secure cookie
    res.setSecureCookie = (name, value, options = {}) => {
      res.cookie(name, value, {
        ...COOKIE_CONFIG[name]?.options,
        ...options,
      });
    };

    // Clear secure cookie
    res.clearSecureCookie = (name) => {
      res.clearCookie(name, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    };

    next();
  });
};
