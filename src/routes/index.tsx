import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@/components/layout";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { GoogleCallback } from "@/components/auth/GoogleCallback";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AccountPage } from "@/pages/AccountPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      {
        path: "auth/google/callback",
        element: <GoogleCallback />,
      },
      {
        path: "account",
        element: (
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
