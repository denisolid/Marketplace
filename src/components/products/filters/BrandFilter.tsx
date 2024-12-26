import { BRANDS } from "@/data/brands";
import { Checkbox } from "@/components/ui/Checkbox";

interface BrandFilterProps {
  selectedBrands: string[];
  onChange: (brands: string[]) => void;
}

export function BrandFilter({ selectedBrands, onChange }: BrandFilterProps) {
  const toggleBrand = (brandId: string) => {
    const newBrands = selectedBrands.includes(brandId)
      ? selectedBrands.filter((id) => id !== brandId)
      : [...selectedBrands, brandId];
    onChange(newBrands);
  };

  return (
    <div className="space-y-2">
      {BRANDS.map((brand) => (
        <Checkbox
          key={brand.id}
          label={brand.name}
          checked={selectedBrands.includes(brand.id)}
          onChange={() => toggleBrand(brand.id)}
        />
      ))}
    </div>
  );
}
