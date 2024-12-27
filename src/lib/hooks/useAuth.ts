import { useCallback } from "react";
import { LoginCredentials } from "@/types/auth"; // Adjust the import path as necessary
import { useAuthStore } from "@/stores/authStore";
import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { useAsync } from "./useAsync";
import { handleApiError } from "@/lib/utils/api";

export function useAuth() {
  const { execute, isLoading, error } = useAsync();
  const { login: loginStore, logout: logoutStore } = useAuthStore();

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        const response = await execute(
          apiClient.post(API_ENDPOINTS.auth.login, credentials)
        );
        const { data } = response as { data: any };
        loginStore(data);
      } catch (error) {
        throw new Error(handleApiError(error));
      }
    },
    [execute, loginStore]
  );

  const logout = useCallback(() => {
    logoutStore();
  }, [logoutStore]);

  return { login, logout, isLoading, error };
}
