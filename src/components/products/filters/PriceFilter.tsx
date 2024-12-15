import { Slider } from '@/components/ui/Slider';

interface PriceFilterProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
  min?: number;
  max?: number;
}

export function PriceFilter({ 
  value, 
  onChange,
  min = 0,
  max = 1000 
}: PriceFilterProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-gray-500">
        <span>${value[0]}</span>
        <span>${value[1]}</span>
      </div>
      <Slider
        min={min}
        max={max}
        step={10}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}