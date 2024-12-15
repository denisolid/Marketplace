import { useWishlistStore } from '@/stores/wishlistStore';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Heart } from 'lucide-react';

export function WishlistPage() {
  const { items } = useWishlistStore();

  return (
    <div className="container py-16">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      
      {items.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-4 text-lg text-gray-500">Your wishlist is empty</p>
        </div>
      ) : (
        <ProductGrid products={items} />
      )}
    </div>
  );
}