import { Select } from '@/components/ui/Select';

interface ProductSortProps {
  onSort: (value: string) => void;
}

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
];

export function ProductSort({ onSort }: ProductSortProps) {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="sort" className="text-sm font-medium text-gray-700">
        Sort by
      </label>
      <Select
        id="sort"
        options={sortOptions}
        onChange={(e) => onSort(e.target.value)}
        className="w-48"
      />
    </div>
  );
}