import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Layout } from "@/components/layout/Layout";

// Public Pages
import { HomePage } from "@/pages/HomePage";
import { NewArrivalsPage } from "@/pages/NewArrivalsPage";
import { ProductsPage } from "@/pages/ProductsPage";
import { ProductDetailPage } from "@/pages/ProductDetailPage";
import { SearchPage } from "@/pages/SearchPage";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { BrandsPage } from "@/pages/BrandsPage";
import { BrandDetailPage } from "@/pages/BrandDetailPage";
import { WomenPage } from "@/pages/collections/WomenPage";
import { MenPage } from "@/pages/collections/MenPage";
import { ContactPage } from "@/pages/info/ContactPage";
import { ShippingPage } from "@/pages/info/ShippingPage";
import { ReturnsPage } from "@/pages/info/ReturnsPage";

// Protected Pages
import { CheckoutPage } from "@/pages/CheckoutPage";
import { AccountPage } from "@/pages/AccountPage";
import { OrdersPage } from "@/pages/OrdersPage";
import { OrderDetailPage } from "@/pages/OrderDetailPage";
import { WishlistPage } from "@/pages/WishlistPage";

// Admin Pages
import { AdminLayout } from "@/pages/admin/AdminLayout";
import { DashboardPage } from "@/pages/admin/DashboardPage";
import { AdminProductsPage } from "@/pages/admin/AdminProductsPage";

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/new-arrivals" element={<NewArrivalsPage />} />
      <Route path="/women" element={<WomenPage />} />
      <Route path="/men" element={<MenPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/brands" element={<BrandsPage />} />
      <Route path="/brands/:brandId" element={<BrandDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Info Pages */}

      <Route path="/contact" element={<ContactPage />} />
      <Route path="/shipping" element={<ShippingPage />} />
      <Route path="/returns" element={<ReturnsPage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:id" element={<OrderDetailPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="products" element={<AdminProductsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
