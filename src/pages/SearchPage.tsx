import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { PRODUCTS } from '@/data/products';
import { searchProducts } from '@/lib/search';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductFilters } from '@/components/products/ProductFilters';
import { ProductSort } from '@/components/products/ProductSort';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('relevance');

  const searchResults = searchProducts(PRODUCTS, query, filters, sortBy);

  return (
    <div className="container py-16">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Search Results</h1>
          <p className="text-gray-600">
            {searchResults.length} results for "{query}"
          </p>
        </div>
        <ProductSort onSort={setSortBy} />
      </div>

      <div className="grid grid-cols-4 gap-8">
        <div className="col-span-1">
          <ProductFilters onFilterChange={setFilters} />
        </div>
        <div className="col-span-3">
          {searchResults.length > 0 ? (
            <ProductGrid products={searchResults} />
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500">No products found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}