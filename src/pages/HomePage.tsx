import { Hero } from '@/components/home/Hero';
import { FeaturedBrands } from '@/components/brands/FeaturedBrands';
import { NewArrivals } from '@/components/home/NewArrivals';
import { Categories } from '@/components/home/Categories';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';

export function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Categories />
      <NewArrivals />
      <FeaturedProducts />
      <FeaturedBrands />
    </div>
  );
}