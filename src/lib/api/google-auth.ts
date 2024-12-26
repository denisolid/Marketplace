import { GOOGLE_AUTH_CONFIG } from "../../../server/config/google-auth";
import { apiClient } from "./client";

export async function initiateGoogleLogin(): Promise<void> {
  const params = new URLSearchParams({
    client_id: GOOGLE_AUTH_CONFIG.client_id,
    redirect_uri: GOOGLE_AUTH_CONFIG.redirect_uri,
    response_type: GOOGLE_AUTH_CONFIG.response_type,
    scope: GOOGLE_AUTH_CONFIG.scope,
    access_type: GOOGLE_AUTH_CONFIG.access_type,
    prompt: GOOGLE_AUTH_CONFIG.prompt,
  });

  const authUrl = `${GOOGLE_AUTH_CONFIG.auth_uri}?${params.toString()}`;
  window.location.href = authUrl;
}

export async function handleGoogleCallback(code: string) {
  try {
    const response = await apiClient.get("/auth/google/callback", {
      params: { code },
    });
    return response.data;
  } catch (error: any) {
    console.error("Google auth error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Google authentication failed"
    );
  }
}
