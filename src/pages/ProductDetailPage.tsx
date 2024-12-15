import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { PRODUCTS } from '@/data/products';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { ProductRecommendations } from '@/components/products/ProductRecommendations';
import { ProductReviews } from '@/components/products/ProductReviews';
import { WishlistButton } from '@/components/products/WishlistButton';

export function ProductDetailPage() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0]);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="container py-16">
        <p className="text-center text-gray-500">Product not found</p>
      </div>
    );
  }

  return (
    <div className="container py-16">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
        {/* Product gallery */}
        <div className="grid gap-4">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product.name} - View ${index + 1}`}
              className="w-full rounded-lg"
            />
          ))}
        </div>

        {/* Product info */}
        <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="mt-2 text-lg text-gray-500">{product.brand}</p>
            <p className="mt-4 text-2xl font-medium">${product.price}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-medium mb-4">Size</h2>
            <div className="grid grid-cols-4 gap-4">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex h-10 items-center justify-center rounded-md border ${
                    selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <Button
              className="flex-1"
              onClick={() => selectedSize && addToCart(product, selectedSize)}
            >
              Add to Cart
            </Button>
            <WishlistButton product={product} />
          </div>

          <div className="prose prose-sm">
            <h2 className="text-lg font-medium">Description</h2>
            <p className="mt-4">{product.description}</p>
          </div>
        </div>
      </div>

      <ProductReviews
        productId={product.id}
        reviews={{
          averageRating: 4.5,
          totalReviews: 12,
          reviews: []
        }}
      />

      <ProductRecommendations currentProduct={product} />
    </div>
  );
}