import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/stores/authStore";

interface LogoutButtonProps {
  variant?: "default" | "outline" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  showIcon?: boolean;
}

export function LogoutButton({
  variant = "outline",
  size = "sm",
  className,
  showIcon = true,
}: LogoutButtonProps) {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // You could add toast notification here
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleLogout}
      className={className}
    >
      {showIcon && <LogOut className="h-4 w-4 mr-2" />}
      Sign Out
    </Button>
  );
}
