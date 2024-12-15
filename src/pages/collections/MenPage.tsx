import { useState } from 'react';
import { PRODUCTS } from '@/data/products';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductFilters } from '@/components/products/filters/ProductFilters';
import { ProductSort } from '@/components/products/ProductSort';
import { filterProducts, sortProducts } from '@/lib/utils/products';

const SUBCATEGORIES = [
  { id: 'suits', name: 'Suits' },
  { id: 'shirts', name: 'Shirts' },
  { id: 'outerwear', name: 'Outerwear' },
  { id: 'accessories', name: 'Accessories' }
];

export function MenPage() {
  const [filters, setFilters] = useState({ category: 'men' });
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = sortProducts(
    filterProducts(PRODUCTS, filters),
    sortBy
  );

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80"
          alt="Men's Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Men's Collection</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto px-4">
              Explore our selection of contemporary Ukrainian menswear
            </p>
          </div>
        </div>
      </div>

      {/* Subcategories Navigation */}
      <div className="border-b">
        <div className="container py-4">
          <div className="flex space-x-8">
            {SUBCATEGORIES.map((subcat) => (
              <button
                key={subcat.id}
                onClick={() => setFilters(prev => ({ ...prev, subcategory: subcat.id }))}
                className="text-sm font-medium hover:text-black transition-colors"
              >
                {subcat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
          </h2>
          <ProductSort onSort={setSortBy} />
        </div>

        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-1">
            <ProductFilters
              initialFilters={filters}
              onFilterChange={setFilters}
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