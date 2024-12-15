import { Product } from '@/types/product';

interface SearchFilters {
  category?: string[];
  brand?: string[];
  priceRange?: {
    min?: number;
    max?: number;
  };
  sizes?: string[];
}

export function searchProducts(
  products: Product[],
  query: string,
  filters?: SearchFilters,
  sortBy: string = 'relevance'
): Product[] {
  let results = products;

  // Apply text search
  if (query) {
    const searchTerms = query.toLowerCase().split(' ');
    results = results.filter(product => {
      const searchableText = `${product.name} ${product.brand} ${product.description} ${product.tags.join(' ')}`.toLowerCase();
      return searchTerms.every(term => searchableText.includes(term));
    });
  }

  // Apply filters
  if (filters) {
    if (filters.category?.length) {
      results = results.filter(product => filters.category.includes(product.category));
    }
    if (filters.brand?.length) {
      results = results.filter(product => filters.brand.includes(product.brand));
    }
    if (filters.sizes?.length) {
      results = results.filter(product => 
        product.sizes.some(size => filters.sizes!.includes(size))
      );
    }
    if (filters.priceRange) {
      results = results.filter(product => {
        const { min, max } = filters.priceRange;
        if (min && product.price < min) return false;
        if (max && product.price > max) return false;
        return true;
      });
    }
  }

  // Apply sorting
  switch (sortBy) {
    case 'price-asc':
      results.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      results.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      // In a real app, we'd sort by creation date
      break;
    case 'relevance':
    default:
      // Results are already sorted by relevance from the text search
      break;
  }

  return results;
}