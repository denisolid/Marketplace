import { useCallback, useState } from 'react';
import { useAsync } from './useAsync';
import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type { Product } from '@/types/product';

interface UseProductsOptions {
  initialFilters?: Record<string, any>;
}

export function useProducts(options: UseProductsOptions = {}) {
  const { execute, isLoading } = useAsync();
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState(options.initialFilters || {});

  const fetchProducts = useCallback(async () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, String(value));
    });

    const { data } = await execute(
      apiClient.get(API_ENDPOINTS.products.list, { params })
    );
    setProducts(data.data);
  }, [execute, filters]);

  const updateFilters = useCallback((newFilters: Record<string, any>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  return {
    products,
    isLoading,
    filters,
    updateFilters,
    fetchProducts
  };
}