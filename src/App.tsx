import { BrowserRouter as Router } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { Layout } from "@/components/layout/Layout";
import { AppRoutes } from "@/routes.tsx";
import "../src/styles.css";

export default function App() {
  return (
    <Router future={{ v7_startTransition: true }}>
      <CartProvider>
        <Layout>
          <AppRoutes />
        </Layout>
      </CartProvider>
    </Router>
  );
}
