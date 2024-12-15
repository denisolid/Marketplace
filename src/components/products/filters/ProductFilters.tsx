import { useState } from 'react';
import { FilterSection } from './FilterSection';
import { FilterOption } from './FilterOption';
import { PriceRangeFilter } from './PriceRangeFilter';
import { BRANDS } from '@/data/brands';
import { CATEGORIES } from '@/data/categories';
import { ProductFilters as Filters } from '@/lib/utils/filters';

interface ProductFiltersProps {
  initialFilters?: Filters;
  onFilterChange: (filters: Filters) => void;
}

export function ProductFilters({ initialFilters = {}, onFilterChange }: ProductFiltersProps) {
  const [expandedSection, setExpandedSection] = useState<string>('category');
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const updateFilters = (key: keyof Filters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-6">
      <FilterSection
        title="Categories"
        isExpanded={expandedSection === 'category'}
        onToggle={() => setExpandedSection(expandedSection === 'category' ? '' : 'category')}
      >
        {CATEGORIES.map((category) => (
          <FilterOption
            key={category.id}
            label={category.name}
            isSelected={filters.category === category.id}
            onClick={() => updateFilters('category', category.id)}
          />
        ))}
      </FilterSection>

      <FilterSection
        title="Brands"
        isExpanded={expandedSection === 'brands'}
        onToggle={() => setExpandedSection(expandedSection === 'brands' ? '' : 'brands')}
      >
        {BRANDS.map((brand) => (
          <FilterOption
            key={brand.id}
            label={brand.name}
            isSelected={filters.brand === brand.name}
            onClick={() => updateFilters('brand', brand.name)}
          />
        ))}
      </FilterSection>

      <FilterSection
        title="Price Range"
        isExpanded={expandedSection === 'price'}
        onToggle={() => setExpandedSection(expandedSection === 'price' ? '' : 'price')}
      >
        <PriceRangeFilter
          min={0}
          max={1000}
          value={filters.priceRange || [0, 1000]}
          onChange={(range) => updateFilters('priceRange', range)}
        />
      </FilterSection>

      <FilterSection
        title="Product Type"
        isExpanded={expandedSection === 'type'}
        onToggle={() => setExpandedSection(expandedSection === 'type' ? '' : 'type')}
      >
        <FilterOption
          label="New Arrivals"
          isSelected={filters.new === true}
          onClick={() => updateFilters('new', !filters.new)}
        />
        <FilterOption
          label="Featured"
          isSelected={filters.featured === true}
          onClick={() => updateFilters('featured', !filters.featured)}
        />
      </FilterSection>
    </div>
  );
}