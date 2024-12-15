import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/products/ProductCard';

export function NewArrivals() {
  // Get the latest 4 products
  const newProducts = PRODUCTS.slice(0, 4);

  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 text-center">New Arrivals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}