import { useParams } from "react-router-dom";
import { useState } from "react";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import { CollectionHero } from "@/components/collections/CollectionHero";
import { SubcategoryNav } from "@/components/collections/SubcategoryNav";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductFilters } from "@/components/products/filters/ProductFilters";
import { ProductSort } from "@/components/products/ProductSort";
import { filterProducts, sortProducts } from "@/lib/utils/products";

export function CollectionPage() {
  const { categoryId } = useParams();
  const category = CATEGORIES.find((c) => c.id === categoryId);

  const [subcategory, setSubcategory] = useState<string | null>(null);
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState("featured");

  if (!category) {
    return (
      <div className="container py-16">
        <p className="text-center text-gray-500">Collection not found</p>
      </div>
    );
  }

  const getFilteredProducts = () => {
    const allFilters = {
      category: categoryId,
      subcategory: subcategory || undefined,
      ...filters,
    };

    let filteredProducts = filterProducts(PRODUCTS, allFilters);
    return sortProducts(filteredProducts, sortBy);
  };

  // Функция для сброса фильтров
  const handleClearFilters = () => {
    setFilters({});
    setSubcategory(null);
  };

  const filteredProducts = getFilteredProducts(); // Получаем отфильтрованные продукты

  return (
    <div>
      <CollectionHero
        title={category.name}
        description={category.description}
        image={category.image}
      />

      <SubcategoryNav
        subcategories={category.subcategories.map((id) => ({
          id,
          name: id.charAt(0).toUpperCase() + id.slice(1),
        }))}
        activeSubcategory={subcategory}
        onSelect={setSubcategory}
      />

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
              onFilterChange={setFilters}
              onClear={handleClearFilters} // Передаем функцию сброса
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
