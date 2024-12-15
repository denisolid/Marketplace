import { Product } from '@/types/product';

export interface ProductFilters {
  category?: string;
  subcategory?: string;
  brand?: string;
  priceRange?: [number, number];
  featured?: boolean;
  new?: boolean;
  sizes?: string[];
}

export function applyFilters(products: Product[], filters: ProductFilters): Product[] {
  return products.filter(product => {
    // Category filter
    if (filters.category && product.category !== filters.category) {
      return false;
    }

    // Subcategory filter
    if (filters.subcategory && product.subcategory !== filters.subcategory) {
      return false;
    }

    // Brand filter
    if (filters.brand && product.brand !== filters.brand) {
      return false;
    }

    // Price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      if (product.price < min || product.price > max) {
        return false;
      }
    }

    // Featured filter
    if (filters.featured && !product.featured) {
      return false;
    }

    // New arrivals filter
    if (filters.new && !product.new) {
      return false;
    }

    // Size filter
    if (filters.sizes?.length && !product.sizes.some(size => filters.sizes?.includes(size))) {
      return false;
    }

    return true;
  });
}

export function sortProducts(products: Product[], sortBy: string): Product[] {
  const sortedProducts = [...products];

  switch (sortBy) {
    case 'featured':
      return sortedProducts.sort((a, b) => {
        if (a.featured === b.featured) return 0;
        return a.featured ? -1 : 1;
      });
    case 'price-asc':
      return sortedProducts.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sortedProducts.sort((a, b) => b.price - a.price);
    case 'newest':
      return sortedProducts.sort((a, b) => {
        if (a.new === b.new) return 0;
        return a.new ? -1 : 1;
      });
    default:
      return sortedProducts;
  }
}