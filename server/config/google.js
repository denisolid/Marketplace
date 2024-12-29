import dotenv from "dotenv";

dotenv.config();

// Validate required environment variables
const requiredVars = [
  "GOOGLE_OAUTH_CLIENT_ID",
  "GOOGLE_OAUTH_CLIENT_SECRET",
  "GOOGLE_OAUTH_REDIRECT_URI",
];

const missingVars = requiredVars.filter((key) => !process.env[key]);
if (missingVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingVars.join(", ")}`
  );
}

export const GOOGLE_CONFIG = {
  clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  redirectUri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
  tokenUrl: "https://oauth2.googleapis.com/token",
  userInfoUrl: "https://www.googleapis.com/oauth2/v2/userinfo",
};
