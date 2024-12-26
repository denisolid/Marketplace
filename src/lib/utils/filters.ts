import { Product } from "@/types/product";

export interface ProductFilters {
  category?: string;
  subcategory?: string;
  brands?: string[]; // Changed from brand (singular) to brands (plural)
  priceRange?: [number, number];
  featured?: boolean;
  new?: boolean;
  sizes?: string[];
  colors?: string[];
}

export function applyFilters(
  products: Product[],
  filters: ProductFilters
): Product[] {
  return products.filter((product) => {
    // Category filter
    if (filters.category && product.category !== filters.category) {
      return false;
    }

    // Subcategory filter
    if (filters.subcategory && product.subcategory !== filters.subcategory) {
      return false;
    }

    // Brands filter (multiple)
    if (filters.brands?.length && !filters.brands.includes(product.brand)) {
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
    if (
      filters.sizes?.length &&
      !product.sizes.some((size) => filters.sizes!.includes(size))
    ) {
      return false;
    }

    // Color filter
    if (
      filters.colors?.length &&
      !product.colors.some((color) => filters.colors!.includes(color))
    ) {
      return false;
    }

    return true;
  });
}
