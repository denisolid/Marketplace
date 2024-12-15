import { BRANDS } from '@/data/brands';
import { BrandCard } from '@/components/brands/BrandCard';

export function BrandsPage() {
  return (
    <div className="container py-16">
      <h1 className="text-3xl font-bold mb-8">Our Brands</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BRANDS.map((brand) => (
          <BrandCard key={brand.id} brand={brand} />
        ))}
      </div>
    </div>
  );
}