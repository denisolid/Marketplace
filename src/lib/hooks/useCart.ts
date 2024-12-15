import { useCallback } from 'react';
import { useAsync } from './useAsync';
import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type { Product } from '@/types/product';

export function useCart() {
  const { execute, isLoading } = useAsync();

  const addToCart = useCallback(async (product: Product, size: string, quantity = 1) => {
    await execute(
      apiClient.post(API_ENDPOINTS.cart.add, {
        productId: product.id,
        size,
        quantity
      })
    );
  }, [execute]);

  const updateQuantity = useCallback(async (productId: string, quantity: number) => {
    await execute(
      apiClient.put(API_ENDPOINTS.cart.update(productId), { quantity })
    );
  }, [execute]);

  const removeFromCart = useCallback(async (productId: string) => {
    await execute(
      apiClient.put(API_ENDPOINTS.cart.update(productId), { quantity: 0 })
    );
  }, [execute]);

  return {
    addToCart,
    updateQuantity,
    removeFromCart,
    isLoading
  };
}