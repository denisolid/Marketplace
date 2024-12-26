import axios from "axios";
import { apiClient } from "./client";
import { initiateGoogleLogin } from "./google-auth";
import type { LoginCredentials, RegisterCredentials } from "@/types/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export async function register(credentials: RegisterCredentials) {
  try {
    const response = await api.post("/auth/register", credentials);
    return response.data;
  } catch (error: any) {
    console.error("Registration error:", error.response?.data || error.message);
    throw {
      message: error.response?.data?.message || "Registration failed",
      status: error.response?.status,
    };
  }
}

export async function login(credentials: LoginCredentials) {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error: any) {
    console.error("Login error:", error.response?.data || error.message);
    throw {
      message: error.response?.data?.message || "Login failed",
      status: error.response?.status,
    };
  }
}

export async function googleAuth(code: string) {
  try {
    const response = await apiClient.get("/auth/google/callback", {
      params: { code },
    });

    // Ensure we're returning the expected data structure
    const { user, token } = response.data.data;
    return { user, token };
  } catch (error: any) {
    console.error("Google auth error:", error.response?.data || error.message);
    throw {
      message: error.response?.data?.message || "Google authentication failed",
      status: error.response?.status,
    };
  }
}

export { initiateGoogleLogin as loginWithGoogle };

export async function logout() {
  try {
    await apiClient.post("/auth/logout");
    localStorage.removeItem("token");
  } catch (error: any) {
    console.error("Logout error:", error.response?.data || error.message);
    // Still remove token even if the API call fails
    localStorage.removeItem("token");
    throw {
      message: error.response?.data?.message || "Logout failed",
      status: error.response?.status,
    };
  }
}
