import { Link } from "react-router-dom";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils/format";
import { BRANDS } from "@/data/brands";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const brand = BRANDS.find((b) => b.id === product.brand);

  return (
    <Link to={`/products/${product.id}`} className="group">
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-4 space-y-1">
        <p className="text-sm text-gray-500">{brand?.name}</p>
        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
        <p className="font-medium">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
