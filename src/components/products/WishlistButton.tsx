import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useWishlistStore } from '@/stores/wishlistStore';
import type { Product } from '@/types/product';

interface WishlistButtonProps {
  product: Product;
}

export function WishlistButton({ product }: WishlistButtonProps) {
  const { addItem, removeItem, isInWishlist } = useWishlistStore();
  const isWishlisted = isInWishlist(product.id);

  const handleClick = () => {
    if (isWishlisted) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleClick}
      className="flex items-center gap-2"
    >
      <Heart
        className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
      />
      {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
    </Button>
  );
}