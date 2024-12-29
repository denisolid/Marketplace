export const env = {
  apiUrl: import.meta.env.VITE_API_URL || "https://marketplace-4.onrender.com",
  googleAuth: {
    clientId: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID as string,
    clientSecret: import.meta.env.VITE_GOOGLE_OAUTH_SECRET as string,
    redirectUri: `${window.location.origin}/auth/google/callback`,
  },
} as const;

// Validate required environment variables
const requiredEnvVars = [
  "VITE_GOOGLE_OAUTH_CLIENT_ID",
  "VITE_GOOGLE_OAUTH_SECRET",
] as const;

requiredEnvVars.forEach((key) => {
  if (!import.meta.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});
