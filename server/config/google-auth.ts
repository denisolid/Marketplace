import { z } from "zod";

const envSchema = z.object({
  VITE_GOOGLE_OAUTH_CLIENT_ID: z.string(),
  VITE_GOOGLE_OAUTH_REDIRECT_URI: z.string().url(),
});

// Validate environment variables
const env = envSchema.parse(import.meta.env);

export const GOOGLE_AUTH_CONFIG = {
  auth_uri: "https://accounts.google.com/o/oauth2/v2/auth",
  client_id: env.VITE_GOOGLE_OAUTH_CLIENT_ID,
  redirect_uri: env.VITE_GOOGLE_OAUTH_REDIRECT_URI,
  response_type: "code",
  scope: encodeURIComponent("email profile"),
  access_type: "offline",
  prompt: "consent",
} as const;
