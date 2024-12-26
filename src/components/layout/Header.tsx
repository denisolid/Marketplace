import { useState } from "react";
import { ShoppingBag, Search, Menu, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { MainNav } from "../navigation/MainNav";
import { CartDrawer } from "../cart/CartDrawer";
import { SearchBar } from "../search/SearchBar";
import { MobileMenuDrawer } from "../navigation/MobileMenuDrawer";
import { useCart } from "@/context/CartContext";
import { useAuthStore } from "@/stores/authStore";

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useCart();
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const itemCount = cart.items.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Button
            variant="outline"
            size="sm"
            className="mr-2 lg:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/" className="text-xl font-bold">
            UKRAINIAN FASHION
          </Link>
        </div>

        <MainNav />

        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>

          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link to="/account">
                <Button variant="outline" size="sm">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-5 w-5" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="ml-1 text-sm font-medium">{itemCount}</span>
            )}
          </Button>
        </div>
      </div>

      {isSearchOpen && (
        <div className="border-t border-gray-200 py-4">
          <div className="container">
            <SearchBar onClose={() => setIsSearchOpen(false)} />
          </div>
        </div>
      )}

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
