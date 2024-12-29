import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

export function GoogleCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleGoogleAuth } = useAuthStore();

  useEffect(() => {
    const code = searchParams.get("code");

    if (!code) {
      console.error("No authorization code found");
      navigate("/login");
      return;
    }

    handleGoogleAuth(code)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Google auth error:", error);
        navigate("/login");
      });
  }, [searchParams, navigate, handleGoogleAuth]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">Authenticating...</h1>
        <p className="text-gray-600">
          Please wait while we complete your sign in.
        </p>
      </div>
    </div>
  );
}
