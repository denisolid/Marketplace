import { useState } from "react";
import { FilterSection } from "./FilterSection";
import { PriceRangeFilter } from "./PriceRangeFilter";
import { ColorFilter } from "./ColorFilter";
import { SizeFilter } from "./SizeFilter";
import { BrandFilter } from "./BrandFilter";
import { ClearFiltersButton } from "./ClearFiltersButton";
import { COLORS, SIZES } from "./constants";
import { ProductFilters as Filters } from "@/lib/utils/filters";

interface ProductFiltersProps {
  initialFilters?: Filters;
  onFilterChange: (filters: Filters) => void;
}

export function ProductFilters({
  initialFilters = {},
  onFilterChange,
}: ProductFiltersProps) {
  const [expandedSection, setExpandedSection] = useState<string>("category");
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const updateFilters = (key: keyof Filters, value: any) => {
    const newFilters = { ...filters, [key]: value } as Filters;

    // Create a new object for the cleaned filters
    const cleanedFilters: Filters = {};

    // Type-safe way to iterate through filters
    (Object.keys(newFilters) as Array<keyof Filters>).forEach((key) => {
      const val = newFilters[key];
      if (Array.isArray(val) && val.length > 0) {
        cleanedFilters[key] = val;
      } else if (val !== undefined && !Array.isArray(val)) {
        cleanedFilters[key] = val;
      }
    });

    setFilters(cleanedFilters);
    onFilterChange(cleanedFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <div className="space-y-6">
      <ClearFiltersButton onClear={clearFilters} isVisible={hasActiveFilters} />

      <FilterSection
        title="Brands"
        isExpanded={expandedSection === "brands"}
        onToggle={() =>
          setExpandedSection(expandedSection === "brands" ? "" : "brands")
        }
      >
        <BrandFilter
          selectedBrands={filters.brands || []}
          onChange={(brands) => updateFilters("brands", brands)}
        />
      </FilterSection>

      <FilterSection
        title="Size"
        isExpanded={expandedSection === "size"}
        onToggle={() =>
          setExpandedSection(expandedSection === "size" ? "" : "size")
        }
      >
        <SizeFilter
          options={SIZES}
          selectedSizes={filters.sizes || []}
          onChange={(sizes) => updateFilters("sizes", sizes)}
        />
      </FilterSection>

      <FilterSection
        title="Color"
        isExpanded={expandedSection === "color"}
        onToggle={() =>
          setExpandedSection(expandedSection === "color" ? "" : "color")
        }
      >
        <ColorFilter
          options={COLORS}
          selectedColors={filters.colors || []}
          onChange={(colors) => updateFilters("colors", colors)}
        />
      </FilterSection>

      <FilterSection
        title="Price Range"
        isExpanded={expandedSection === "price"}
        onToggle={() =>
          setExpandedSection(expandedSection === "price" ? "" : "price")
        }
      >
        <PriceRangeFilter
          min={0}
          max={1000}
          value={filters.priceRange || [0, 1000]}
          onChange={(range) => updateFilters("priceRange", range)}
        />
      </FilterSection>
    </div>
  );
}
