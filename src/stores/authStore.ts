import { create } from "zustand";
import { persist } from "zustand/middleware";
import { login, register } from "@/lib/api/auth";
import { handleGoogleCallback } from "@/lib/api/google-auth";
import type {
  AuthState,
  LoginCredentials,
  RegisterCredentials,
} from "@/types/auth";
import { apiClient } from "@/lib/api/client";

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  handleGoogleAuth: (code: string) => Promise<void>;
  handleGoogleCallback(code: string): Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials) => {
        set({ isLoading: true });
        try {
          const { data } = await login(credentials);
          set({
            user: data.user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (credentials) => {
        set({ isLoading: true });
        try {
          const response = await register(credentials);
          set({ isLoading: false });
          return response;
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      handleGoogleAuth: async (code) => {
        set({ isLoading: true });
        try {
          const { data } = await handleGoogleCallback(code);
          set({
            user: data.user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      handleGoogleCallback(code: string): Promise<void> {
        // Implementation of the method
        return new Promise((resolve, reject) => {
          // Simulate an API call
          setTimeout(() => {
            if (code) {
              resolve();
            } else {
              reject(new Error("Invalid code"));
            }
          }, 1000);
        });
      },

      logout: async () => {
        try {
          await apiClient.post("/api/auth/logout");
          set({
            user: null,
            isAuthenticated: false,
          });
        } catch (error) {
          console.error("Logout error:", error);
          // Still clear state even if API call fails
          set({
            user: null,
            isAuthenticated: false,
          });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
