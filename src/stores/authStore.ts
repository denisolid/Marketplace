import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  login,
  register,
  googleAuth,
  logout as logoutApi,
} from "@/lib/api/auth";
import type {
  AuthState,
  LoginCredentials,
  RegisterCredentials,
} from "@/types/auth";

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  handleGoogleCallback: (code: string) => Promise<void>;
  logout: () => Promise<void>;
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
          const { user, token } = await login(credentials);
          localStorage.setItem("token", token);
          set({
            user,
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
          const { user, token } = await register(credentials);
          localStorage.setItem("token", token);
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      handleGoogleCallback: async (code) => {
        set({ isLoading: true });
        try {
          const { user, token } = await googleAuth(code);
          if (!user || !token) {
            throw new Error("Invalid response from Google authentication");
          }
          localStorage.setItem("token", token);
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        try {
          await logoutApi();
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          localStorage.removeItem("token");
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
