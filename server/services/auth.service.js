import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";
import { GOOGLE_OAUTH_CONFIG, JWT_CONFIG } from "../config/constants.js";
import { logger } from "../config/logger.js";
import dotenv from "dotenv";
dotenv.config();

const googleClient = new OAuth2Client({
  clientId: GOOGLE_OAUTH_CONFIG.clientId,
  clientSecret: GOOGLE_OAUTH_CONFIG.clientSecret,
  redirectUri: GOOGLE_OAUTH_CONFIG.redirectUri,
});

// Token blacklist (in-memory for demo, use Redis in production)
const tokenBlacklist = new Set();

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

  static async googleAuth(code) {
    try {
      const { tokens } = await googleClient.getToken(code);
      const ticket = await googleClient.verifyIdToken({
        idToken: tokens.id_token,
        audience: GOOGLE_OAUTH_CONFIG.clientId,
      });

      const payload = ticket.getPayload();

      if (!payload || !payload.email) {
        throw new Error("Invalid Google token");
      }

      // Find or create user
      let user = await User.findOne({ email: payload.email });

      if (!user) {
        // Create new user from Google data
        user = await User.create({
          name: payload.name,
          email: payload.email,
          googleId: payload.sub,
          avatar: payload.picture,
          // Set a random password since we won't use it
          password: Math.random().toString(36).slice(-8),
        });
        logger.info(`Created new user via Google OAuth: ${user.email}`);
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

  static async logout(token) {
    tokenBlacklist.add(token);
    logger.info("Token added to blacklist");
    this.cleanupBlacklist();
  }

  static isTokenBlacklisted(token) {
    return tokenBlacklist.has(token);
  }

  static cleanupBlacklist() {
    for (const token of tokenBlacklist) {
      try {
        jwt.verify(token, JWT_CONFIG.secret);
      } catch (error) {
        tokenBlacklist.delete(token);
      }
    }
  }
}
