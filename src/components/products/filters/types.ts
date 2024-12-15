export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterSection {
  id: string;
  name: string;
  options: FilterOption[];
}

export interface FilterProps {
  onFilterChange: (filters: Record<string, any>) => void;
  initialFilters?: Record<string, any>;
  className?: string;
}