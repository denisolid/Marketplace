import { Product } from '@/types/product';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductSort } from '@/components/products/ProductSort';
import { ProductFilters } from '@/components/products/ProductFilters';

interface SearchResultsProps {
  query: string;
  products: Product[];
}

export function SearchResults({ query, products }: SearchResultsProps) {
  return (
    <div className="container py-16">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Search Results</h1>
          <p className="text-gray-600">
            {products.length} results for "{query}"
          </p>
        </div>
        <ProductSort onSort={() => {}} />
      </div>

      <div className="grid grid-cols-4 gap-8">
        <div className="col-span-1">
          <ProductFilters onFilterChange={() => {}} />
        </div>
        <div className="col-span-3">
          {products.length > 0 ? (
            <ProductGrid products={products} />
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