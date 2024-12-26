import { Checkbox } from "@/components/ui/Checkbox";

interface ColorOption {
  id: string;
  label: string;
  hex: string;
}

interface ColorFilterProps {
  options: ColorOption[];
  selectedColors: string[];
  onChange: (colors: string[]) => void;
}

export function ColorFilter({
  options,
  selectedColors,
  onChange,
}: ColorFilterProps) {
  const toggleColor = (colorId: string) => {
    const newColors = selectedColors.includes(colorId)
      ? selectedColors.filter((id) => id !== colorId)
      : [...selectedColors, colorId];
    onChange(newColors);
  };

  return (
    <div className="space-y-2">
      {options.map((color) => (
        <div key={color.id} className="flex items-center">
          <Checkbox
            label={color.label}
            checked={selectedColors.includes(color.id)}
            onChange={() => toggleColor(color.id)}
          />
          <span
            className="ml-2 w-4 h-4 rounded-full border shadow-sm"
            style={{ backgroundColor: color.hex }}
          />
        </div>
      ))}
    </div>
  );
}
