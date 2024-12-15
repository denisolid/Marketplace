import { Product } from '@/types/product';

export function getRelatedProducts(product: Product, allProducts: Product[], limit = 4): Product[] {
  return allProducts
    .filter(p => 
      p.id !== product.id && 
      (p.category === product.category || 
       p.brand === product.brand ||
       p.subcategory === product.subcategory)
    )
    .slice(0, limit);
}

export function getPersonalizedRecommendations(
  viewedProducts: Product[],
  allProducts: Product[],
  limit = 4
): Product[] {
  const viewedCategories = new Set(viewedProducts.map(p => p.category));
  const viewedBrands = new Set(viewedProducts.map(p => p.brand));
  const viewedSubcategories = new Set(viewedProducts.map(p => p.subcategory));

  return allProducts
    .filter(product => !viewedProducts.find(p => p.id === product.id))
    .sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      // Score based on matching categories
      if (viewedCategories.has(a.category)) scoreA += 3;
      if (viewedCategories.has(b.category)) scoreB += 3;

      // Score based on matching brands
      if (viewedBrands.has(a.brand)) scoreA += 2;
      if (viewedBrands.has(b.brand)) scoreB += 2;

      // Score based on matching subcategories
      if (viewedSubcategories.has(a.subcategory)) scoreA += 1;
      if (viewedSubcategories.has(b.subcategory)) scoreB += 1;

      return scoreB - scoreA;
    })
    .slice(0, limit);
}