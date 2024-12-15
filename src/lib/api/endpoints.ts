export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
  },
  products: {
    list: '/products',
    detail: (id: string) => `/products/${id}`,
  },
  cart: {
    get: '/cart',
    add: '/cart/items',
    update: (productId: string) => `/cart/items/${productId}`,
    clear: '/cart/items',
  },
  orders: {
    list: '/orders',
    create: '/orders',
    detail: (id: string) => `/orders/${id}`,
    updateStatus: (id: string) => `/orders/${id}/status`,
  },
} as const;