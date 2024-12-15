import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import { Layout } from '@/components/layout/Layout';
import { AppRoutes } from '@/routes';

export default function App() {
  return (
    <Router>
      <CartProvider>
        <Layout>
          <AppRoutes />
        </Layout>
      </CartProvider>
    </Router>
  );
}