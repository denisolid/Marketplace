import { Link } from 'react-router-dom';
import { Brand } from '@/types/brand';

interface BrandCardProps {
  brand: Brand;
}

export function BrandCard({ brand }: BrandCardProps) {
  return (
    <Link 
      to={`/brands/${brand.id}`}
      className="group relative overflow-hidden rounded-lg"
    >
      <img
        src={brand.image}
        alt={brand.name}
        className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
        <h3 className="text-xl font-bold text-white mb-2">{brand.name}</h3>
        <p className="text-neutral-200">{brand.description}</p>
      </div>
    </Link>
  );
}