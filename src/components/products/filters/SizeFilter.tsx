import { Checkbox } from "@/components/ui/Checkbox";

interface SizeOption {
  id: string;
  label: string;
}

interface SizeFilterProps {
  options: SizeOption[];
  selectedSizes: string[];
  onChange: (sizes: string[]) => void;
}

export function SizeFilter({
  options,
  selectedSizes,
  onChange,
}: SizeFilterProps) {
  const toggleSize = (sizeId: string) => {
    const newSizes = selectedSizes.includes(sizeId)
      ? selectedSizes.filter((id) => id !== sizeId)
      : [...selectedSizes, sizeId];
    onChange(newSizes);
  };

  return (
    <div className="space-y-2">
      {options.map((size) => (
        <Checkbox
          key={size.id}
          label={size.label}
          checked={selectedSizes.includes(size.id)}
          onChange={() => toggleSize(size.id)}
        />
      ))}
    </div>
  );
}
