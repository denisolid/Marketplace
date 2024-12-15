import { Product } from '@/types/product';

export function filterProducts(
  products: Product[],
  filters: {
    category?: string;
    subcategory?: string;
    brand?: string;
    priceRange?: [number, number];
    featured?: boolean;
    new?: boolean;
  }
): Product[] {
  return products.filter(product => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.subcategory && product.subcategory !== filters.subcategory) return false;
    if (filters.brand && product.brand !== filters.brand) return false;
    if (filters.featured && !product.featured) return false;
    if (filters.new && !product.new) return false;
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      if (product.price < min || product.price > max) return false;
    }
    return true;
  });
}

export function sortProducts(products: Product[], sortBy: string): Product[] {
  const sortedProducts = [...products];
  
  switch (sortBy) {
    case 'price-asc':
      return sortedProducts.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sortedProducts.sort((a, b) => b.price - a.price);
    case 'newest':
      return sortedProducts.filter(p => p.new).concat(
        sortedProducts.filter(p => !p.new)
      );
    default:
      return sortedProducts;
  }
}