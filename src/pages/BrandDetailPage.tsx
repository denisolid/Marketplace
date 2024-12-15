import { useParams } from 'react-router-dom';
import { BRANDS } from '@/data/brands';
import { PRODUCTS } from '@/data/products';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductSort } from '@/components/products/ProductSort';
import { filterProducts, sortProducts } from '@/lib/utils/products';
import { useState } from 'react';

export function BrandDetailPage() {
  const { brandId } = useParams();
  const brand = BRANDS.find(b => b.id === brandId);
  const [sortBy, setSortBy] = useState('featured');

  if (!brand) {
    return (
      <div className="container py-16">
        <p className="text-center text-gray-500">Brand not found</p>
      </div>
    );
  }

  const brandProducts = sortProducts(
    filterProducts(PRODUCTS, { brand: brand.name }),
    sortBy
  );

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={brand.image}
          alt={brand.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{brand.name}</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto px-4">
              {brand.description}
            </p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">
            {brandProducts.length} {brandProducts.length === 1 ? 'Product' : 'Products'}
          </h2>
          <ProductSort onSort={setSortBy} />
        </div>

        <ProductGrid products={brandProducts} />
      </div>
    </div>
  );
}