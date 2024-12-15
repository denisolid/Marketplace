import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { BRANDS } from '@/data/brands';
import { CATEGORIES } from '@/data/categories';
import { cn } from '@/lib/utils';

interface ProductFiltersProps {
  onFilterChange: (filters: Record<string, any>) => void;
  className?: string;
}

export function ProductFilters({ onFilterChange, className }: ProductFiltersProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('category');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>({});

  const handleFilterChange = (type: string, value: any) => {
    const newFilters = {
      ...selectedFilters,
      [type]: value
    };
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Categories */}
      <div className="border-b pb-4">
        <button
          className="flex w-full items-center justify-between py-2"
          onClick={() => setExpandedSection(prev => prev === 'category' ? null : 'category')}
        >
          <span className="font-medium">Categories</span>
          <ChevronDown className={cn(
            "h-4 w-4 transition-transform",
            expandedSection === 'category' && "rotate-180"
          )} />
        </button>
        
        {expandedSection === 'category' && (
          <div className="mt-2 space-y-2">
            {CATEGORIES.map(category => (
              <button
                key={category.id}
                onClick={() => handleFilterChange('category', category.id)}
                className={cn(
                  "w-full text-left px-2 py-1.5 text-sm rounded-md",
                  selectedFilters.category === category.id
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Brands */}
      <div className="border-b pb-4">
        <button
          className="flex w-full items-center justify-between py-2"
          onClick={() => setExpandedSection(prev => prev === 'brand' ? null : 'brand')}
        >
          <span className="font-medium">Brands</span>
          <ChevronDown className={cn(
            "h-4 w-4 transition-transform",
            expandedSection === 'brand' && "rotate-180"
          )} />
        </button>
        
        {expandedSection === 'brand' && (
          <div className="mt-2 space-y-2">
            {BRANDS.map(brand => (
              <button
                key={brand.id}
                onClick={() => handleFilterChange('brand', brand.name)}
                className={cn(
                  "w-full text-left px-2 py-1.5 text-sm rounded-md",
                  selectedFilters.brand === brand.name
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                )}
              >
                {brand.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="border-b pb-4">
        <button
          className="flex w-full items-center justify-between py-2"
          onClick={() => setExpandedSection(prev => prev === 'price' ? null : 'price')}
        >
          <span className="font-medium">Price Range</span>
          <ChevronDown className={cn(
            "h-4 w-4 transition-transform",
            expandedSection === 'price' && "rotate-180"
          )} />
        </button>
        
        {expandedSection === 'price' && (
          <div className="mt-4 px-2">
            <div className="flex items-center space-x-4">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => {
                  const newRange: [number, number] = [Number(e.target.value), priceRange[1]];
                  setPriceRange(newRange);
                  handleFilterChange('priceRange', newRange);
                }}
                className="w-24 rounded-md border-gray-300"
                min={0}
              />
              <span>to</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => {
                  const newRange: [number, number] = [priceRange[0], Number(e.target.value)];
                  setPriceRange(newRange);
                  handleFilterChange('priceRange', newRange);
                }}
                className="w-24 rounded-md border-gray-300"
                min={0}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}