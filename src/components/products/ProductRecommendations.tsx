import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { getRelatedProducts } from "@/lib/recommendations";
import { PRODUCTS } from "@/data/products";

interface ProductRecommendationsProps {
  currentProduct: Product;
}

export function ProductRecommendations({
  currentProduct,
}: ProductRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Product[]>([]);

  useEffect(() => {
    const relatedProducts = getRelatedProducts(currentProduct, PRODUCTS);
    setRecommendations(relatedProducts);
  }, [currentProduct]);

  if (recommendations.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {recommendations.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
