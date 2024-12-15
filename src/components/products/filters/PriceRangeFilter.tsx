import { useState } from 'react';

interface PriceRangeFilterProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (range: [number, number]) => void;
}

export function PriceRangeFilter({ min, max, value, onChange }: PriceRangeFilterProps) {
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (index: number, newValue: number) => {
    const newRange: [number, number] = [...localValue] as [number, number];
    newRange[index] = newValue;
    setLocalValue(newRange);
  };

  const handleBlur = () => {
    onChange(localValue);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <label className="text-sm text-gray-600">Min</label>
          <input
            type="number"
            value={localValue[0]}
            onChange={(e) => handleChange(0, Number(e.target.value))}
            onBlur={handleBlur}
            min={min}
            max={localValue[1]}
            className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
          />
        </div>
        <div className="flex-1">
          <label className="text-sm text-gray-600">Max</label>
          <input
            type="number"
            value={localValue[1]}
            onChange={(e) => handleChange(1, Number(e.target.value))}
            onBlur={handleBlur}
            min={localValue[0]}
            max={max}
            className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
          />
        </div>
      </div>
    </div>
  );
}