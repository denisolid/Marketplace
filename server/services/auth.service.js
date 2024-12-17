import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";
import { GOOGLE_OAUTH_CONFIG, JWT_CONFIG } from "../config/constants.js";
import { logger } from "../config/logger.js";
import dotenv from "dotenv";
dotenv.config();
const googleClient = new OAuth2Client(
  GOOGLE_OAUTH_CONFIG.clientId,
  GOOGLE_OAUTH_CONFIG.clientSecret,
  GOOGLE_OAUTH_CONFIG.redirectUri
);

export class AuthService {
  static generateToken(userId) {
    return jwt.sign({ id: userId }, JWT_CONFIG.secret, {
      expiresIn: JWT_CONFIG.expiresIn,
    });
  }

  static async register(userData) {
    const userExists = await User.findOne({
      email: userData.email.toLowerCase(),
    });
    if (userExists) {
      throw new Error("Email already registered");
    }

    const user = await User.create({
      ...userData,
      email: userData.email.toLowerCase(),
    });

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: this.generateToken(user._id),
    };
  }

  static async login(email, password) {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await user.comparePassword(password))) {
      throw new Error("Invalid credentials");
    }

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: this.generateToken(user._id),
    };
  }

  static async logout(token) {
    // Add token to blacklist
    tokenBlacklist.add(token);
    logger.info("Token added to blacklist");

    // Clean up expired tokens from blacklist
    this.cleanupBlacklist();
  }

  static isTokenBlacklisted(token) {
    return tokenBlacklist.has(token);
  }

  // Cleanup expired tokens from blacklist
  static cleanupBlacklist() {
    for (const token of tokenBlacklist) {
      try {
        jwt.verify(token, JWT_CONFIG.secret);
      } catch (error) {
        // If token is expired, remove it from blacklist
        tokenBlacklist.delete(token);
      }
    }
  }

  static async googleAuth(code) {
    try {
      // Exchange code for tokens

      const { tokens } = await googleClient.getToken(code);
      const ticket = await googleClient.verifyIdToken({
        idToken: tokens.id_token,
        audience: GOOGLE_OAUTH_CONFIG.clientId,
      });

      console.log("Auth URL:", authUrl);
      const payload = ticket.getPayload();

      // Find or create user
      let user = await User.findOne({ email: payload.email });

      if (!user) {
        user = await User.create({
          name: payload.name,
          email: payload.email,
          googleId: payload.sub,
          avatar: payload.picture,
        });
        logger.info(`Created new user via Google OAuth: ${user.email}`);
      } else if (!user.googleId) {
        user.googleId = payload.sub;
        user.avatar = payload.picture;
        await user.save();
        logger.info(`Linked Google account to existing user: ${user.email}`);
      }

      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        token: this.generateToken(user._id),
      };
    } catch (error) {
      logger.error("Google OAuth error:", error);
      throw new Error("Failed to authenticate with Google");
    }
  }
}
