import { BRANDS } from '@/data/brands';
import { BrandCard } from './BrandCard';

export function FeaturedBrands() {
  const featuredBrands = BRANDS.filter(brand => brand.featured);

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Featured Brands</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredBrands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
}