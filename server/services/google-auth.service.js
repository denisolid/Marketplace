import axios from "axios";
import { GOOGLE_CONFIG } from "../config/google.js";
import { AuthService } from "./auth.service.js";
import User from "../models/User.js";
import { logger } from "../config/logger.js";
import crypto from "crypto";

export class GoogleAuthService {
  static generateSecurePassword() {
    return crypto.randomBytes(32).toString("hex");
  }

  static async getAccessToken(code) {
    try {
      const params = new URLSearchParams({
        code,
        client_id: GOOGLE_CONFIG.clientId,
        client_secret: GOOGLE_CONFIG.clientSecret,
        redirect_uri: GOOGLE_CONFIG.redirectUri,
        grant_type: "authorization_code",
      });

      logger.info("Requesting Google access token");
      const response = await axios.post(GOOGLE_CONFIG.tokenUrl, params);

      if (!response.data.access_token) {
        logger.error("No access token in Google response", response.data);
        throw new Error("Failed to get access token from Google");
      }

      return response.data.access_token;
    } catch (error) {
      logger.error("Failed to get Google access token:", {
        error: error.response?.data || error.message,
        status: error.response?.status,
      });
      throw new Error("Failed to get access token from Google");
    }
  }

  static async getUserInfo(accessToken) {
    try {
      logger.info("Fetching Google user info");
      const response = await axios.get(GOOGLE_CONFIG.userInfoUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const userData = response.data;
      if (!userData.email) {
        logger.error("No email in Google user data", userData);
        throw new Error("Invalid user data from Google");
      }

      return userData;
    } catch (error) {
      logger.error("Failed to get Google user info:", {
        error: error.response?.data || error.message,
        status: error.response?.status,
      });
      throw new Error("Failed to get user info from Google");
    }
  }

  static async handleCallback(code) {
    try {
      // Validate required config
      if (
        !GOOGLE_CONFIG.clientId ||
        !GOOGLE_CONFIG.clientSecret ||
        !GOOGLE_CONFIG.redirectUri
      ) {
        logger.error("Missing required Google OAuth config");
        throw new Error("Invalid Google OAuth configuration");
      }

      // Get access token from Google
      const accessToken = await this.getAccessToken(code);

      // Get user info from Google
      const googleUser = await this.getUserInfo(accessToken);

      // Find or create user
      let user = await User.findOne({ email: googleUser.email });

      if (!user) {
        // Create new user from Google data
        user = await User.create({
          email: googleUser.email,
          name: googleUser.name,
          googleId: googleUser.sub, // Add Google ID
          avatar: googleUser.picture,
          password: this.generateSecurePassword(),
          authProvider: "google",
        });
        logger.info(`New user created via Google: ${user.email}`);
      } else if (!user.googleId) {
        // Update existing user with Google info
        user.googleId = googleUser.sub;
        user.authProvider = "google";
        if (!user.avatar) user.avatar = googleUser.picture;
        await user.save();
        logger.info(`Existing user linked to Google: ${user.email}`);
      }

      // Generate JWT token
      const token = AuthService.generateToken(user._id);

      return { user, token };
    } catch (error) {
      logger.error("Google auth error:", error);
      throw error;
    }
  }
}
