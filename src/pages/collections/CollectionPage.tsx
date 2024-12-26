import { useParams } from "react-router-dom";
import { useState } from "react";
import { PRODUCTS } from "@/data/products";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductFilters } from "@/components/products/filters/ProductFilters";
import { ProductSort } from "@/components/products/ProductSort";
import { sortProducts } from "@/lib/utils/products";
import { applyFilters } from "@/lib/utils/filters";
import type { ProductFilters as Filters } from "@/lib/utils/filters";

export function CollectionPage() {
  const { categoryId } = useParams();
  const [filters, setFilters] = useState<Filters>({ category: categoryId });
  const [sortBy, setSortBy] = useState("featured");

  // Apply filters and sorting
  const filteredProducts = sortProducts(
    applyFilters(PRODUCTS, filters),
    sortBy
  );

  const handleFilterChange = (newFilters: Filters) => {
    // Preserve the category filter from the URL
    setFilters({ ...newFilters, category: categoryId });
  };

  const heroImage =
    categoryId === "women"
      ? "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80"
      : "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80";

  const heroTitle =
    categoryId === "women" ? "Women's Collection" : "Men's Collection";
  const heroDescription =
    categoryId === "women"
      ? "Discover our curated selection of premium Ukrainian fashion for women"
      : "Explore our selection of contemporary Ukrainian menswear";

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden">
        <img
          src={heroImage}
          alt={heroTitle}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{heroTitle}</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto px-4">
              {heroDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "Product" : "Products"}
          </h2>
          <ProductSort onSort={setSortBy} />
        </div>

        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-1">
            <ProductFilters
              initialFilters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
          <div className="col-span-3">
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}
