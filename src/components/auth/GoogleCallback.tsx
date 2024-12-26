import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

export function GoogleCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleGoogleCallback } = useAuthStore();

  useEffect(() => {
    const code = searchParams.get("code");

    if (!code) {
      navigate("/login");
      return;
    }

    handleGoogleCallback(code)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Google authentication failed:", error);
        navigate("/login");
      });
  }, [searchParams, handleGoogleCallback, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Authenticating...</h2>
        <p className="mt-2 text-gray-600">
          Please wait while we complete your sign in
        </p>
      </div>
    </div>
  );
}
