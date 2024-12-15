import { cn } from '@/lib/utils';

interface FilterOptionProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export function FilterOption({ label, isSelected, onClick }: FilterOptionProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left px-2 py-1.5 text-sm rounded-md transition-colors",
        isSelected
          ? "bg-black text-white"
          : "hover:bg-gray-100"
      )}
    >
      {label}
    </button>
  );
}