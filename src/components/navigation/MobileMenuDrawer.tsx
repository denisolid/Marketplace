import { X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "../ui/Button";
import cn from "classnames";

const NAV_ITEMS = [
  {
    label: "New Arrivals",
    href: "/products",
    query: "?sort=newest",
  },
  {
    label: "Women",
    href: "/women",
  },
  {
    label: "Men",
    href: "/men",
  },
  {
    label: "Brands",
    href: "/brands",
  },
];

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenuDrawer({ isOpen, onClose }: MobileMenuDrawerProps) {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuthStore();

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-50 flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <span className="font-bold">Menu</span>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href + (item.query || "")}
                  className={cn(
                    "block py-2 transition-colors hover:text-neutral-600",
                    location.pathname === item.href &&
                      "text-black font-semibold"
                  )}
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t">
          {isAuthenticated ? (
            <div className="space-y-4">
              <Link
                to="/account"
                className="block py-2 hover:text-neutral-600"
                onClick={onClose}
              >
                My Account
              </Link>
              <Link
                to="/wishlist"
                className="block py-2 hover:text-neutral-600"
                onClick={onClose}
              >
                Wishlist
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <Link to="/login" onClick={onClose}>
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link to="/register" onClick={onClose}>
                <Button className="w-full">Create Account</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
