import { apiClient } from "./client";
import { GOOGLE_AUTH_CONFIG } from "@/lib/config/auth";
import { API_ENDPOINTS } from "./endpoints";

export async function initiateGoogleAuth() {
  const params = new URLSearchParams({
    client_id: GOOGLE_AUTH_CONFIG.client_id,
    redirect_uri: GOOGLE_AUTH_CONFIG.redirect_uri,
    response_type: GOOGLE_AUTH_CONFIG.response_type,
    scope: GOOGLE_AUTH_CONFIG.scope,
    access_type: GOOGLE_AUTH_CONFIG.access_type,
    prompt: GOOGLE_AUTH_CONFIG.prompt,
  });

  window.location.href = `${GOOGLE_AUTH_CONFIG.auth_uri}?${params}`;
}

export async function handleGoogleCallback(code: string) {
  try {
    const response = await apiClient.post(API_ENDPOINTS.auth.google, { code });
    return response.data;
  } catch (error) {
    console.error("Google auth callback error:", error);
    throw error;
  }
}
