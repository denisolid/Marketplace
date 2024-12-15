export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterSection {
  id: string;
  name: string;
  options: FilterOption[];
}

export interface ProductFiltersProps {
  onFilterChange: (filters: Record<string, string[]>) => void;
  initialFilters?: Record<string, string[]>;
  className?: string;
}