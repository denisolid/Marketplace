```tsx
import { Routes, Route } from 'react-router-dom';
import { AdminLayout } from '@/pages/admin/AdminLayout';
import { DashboardPage } from '@/pages/admin/DashboardPage';
import { ProductsPage } from '@/pages/admin/ProductsPage';
// ... other imports

export function AppRoutes() {
  return (
    <Routes>
      {/* Existing routes */}
      
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="products" element={<ProductsPage />} />
        {/* Add more admin routes as needed */}
      </Route>
    </Routes>
  );
}
```