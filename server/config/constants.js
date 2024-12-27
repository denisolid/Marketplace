import dotenv from "dotenv";

dotenv.config();

export const MONGODB_OPTIONS = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
  maxPoolSize: 10,
  minPoolSize: 2,
  retryWrites: true,
  retryReads: true,
};

export const CORS_OPTIONS = {
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.FRONTEND_URL
      : ["http://localhost:5173", "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  maxAge: 600, // 10 minutes
};

export const GOOGLE_OAUTH_CONFIG = {
  clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_OAUTH_SECRET,
  redirectUri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
};

export const JWT_CONFIG = {
  secret: process.env.JWT_SECRET || "QQWRF_#@E$*#@(#&&&E#^%53536fGW",
  expiresIn: "30d",
};
