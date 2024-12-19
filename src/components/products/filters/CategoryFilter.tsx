import { FilterOption } from "./types";

interface CategoryFilterProps {
  options: FilterOption[];
  activeFilters: string[];
  onToggle: (value: string) => void;
}

export function CategoryFilter({
  options,
  activeFilters,
  onToggle,
}: CategoryFilterProps) {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onToggle(option.value)}
          className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm ${
            activeFilters.includes(option.value)
              ? "bg-black text-white"
              : "hover:bg-gray-100"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
