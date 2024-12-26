import { Product } from "@/types/product";
import { ProductFilters } from "./filters";

export function filterProducts(
  products: Product[],
  filters: ProductFilters
): Product[] {
  return products.filter((product) => {
    // Category filter
    if (filters.category && product.category !== filters.category) {
      return false;
    }

    // Brands filter (multiple)
    if (filters.brands?.length && !filters.brands.includes(product.brand)) {
      return false;
    }

    // Size filter (multiple)
    if (
      filters.sizes?.length &&
      !product.sizes.some((size) => filters.sizes!.includes(size))
    ) {
      return false;
    }

    // Color filter (multiple)
    if (
      filters.colors?.length &&
      !product.colors.some((color) => filters.colors!.includes(color))
    ) {
      return false;
    }

    // Price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      if (product.price < min || product.price > max) {
        return false;
      }
    }

    return true;
  });
}

export function sortProducts(products: Product[], sortBy: string): Product[] {
  const sortedProducts = [...products];

  switch (sortBy) {
    case "price-asc":
      return sortedProducts.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sortedProducts.sort((a, b) => b.price - a.price);
    case "newest":
      return sortedProducts
        .filter((p) => p.new)
        .concat(sortedProducts.filter((p) => !p.new));
    default:
      return sortedProducts;
  }
}
