export const API_ENDPOINTS = {
  auth: {
    login: "/api/auth/login",
    register: "/api/auth/register",
    logout: "/api/auth/logout",
    google: "/api/auth/google",
  },
  products: {
    list: "/api/products",
    detail: (id: string) => `/api/products/${id}`,
  },
  cart: {
    get: "/api/cart",
    add: "/api/cart/items",
    update: (productId: string) => `/api/cart/items/${productId}`,
    clear: "/api/cart/items",
  },
  orders: {
    list: "/api/orders",
    create: "/api/orders",
    detail: (id: string) => `/api/orders/${id}`,
    updateStatus: (id: string) => `/api/orders/${id}/status`,
  },
} as const;
