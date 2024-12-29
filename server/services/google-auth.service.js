import axios from "axios";
import { GOOGLE_CONFIG } from "../config/google.js";
import { AuthService } from "./auth.service.js";
import User from "../models/User.js";
import { logger } from "../config/logger.js";

export class GoogleAuthService {
  static validateConfig() {
    const { clientId, clientSecret, redirectUri } = GOOGLE_CONFIG;
    const config = {
      hasClientId: Boolean(clientId),
      hasClientSecret: Boolean(clientSecret),
      hasRedirectUri: Boolean(redirectUri),
    };

    if (
      !config.hasClientId ||
      !config.hasClientSecret ||
      !config.hasRedirectUri
    ) {
      logger.error("Missing Google OAuth config", config);
      throw new Error("Invalid Google OAuth configuration");
    }
  }

  static async getAccessToken(code) {
    this.validateConfig();

    const params = new URLSearchParams({
      code,
      client_id: GOOGLE_CONFIG.clientId,
      client_secret: GOOGLE_CONFIG.clientSecret,
      redirect_uri: GOOGLE_CONFIG.redirectUri,
      grant_type: "authorization_code",
    });

    const { data } = await axios.post(GOOGLE_CONFIG.tokenUrl, params);
    return data.access_token;
  }

  static async getUserInfo(accessToken) {
    const { data } = await axios.get(GOOGLE_CONFIG.userInfoUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data;
  }

  static async handleCallback(code) {
    try {
      // Get access token from Google
      const accessToken = await this.getAccessToken(code);

      // Get user info from Google
      const googleUser = await this.getUserInfo(accessToken);

      // Find or create user
      let user = await User.findOne({ email: googleUser.email });

      if (!user) {
        user = await User.create({
          email: googleUser.email,
          name: googleUser.name,
          googleId: googleUser.id,
        });
        logger.info(`New user created via Google: ${user.email}`);
      }

      // Generate JWT token
      const token = AuthService.generateToken(user._id);

      return { user, token };
    } catch (error) {
      logger.error("Google auth error:", error);
      throw new Error("Google authentication failed");
    }
  }
}
