import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface FilterSectionProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export function FilterSection({ title, isExpanded, onToggle, children }: FilterSectionProps) {
  return (
    <div className="border-b pb-4">
      <button
        className="flex w-full items-center justify-between py-2"
        onClick={onToggle}
      >
        <span className="font-medium">{title}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            isExpanded && "rotate-180"
          )}
        />
      </button>
      
      {isExpanded && (
        <div className="mt-2 space-y-2">
          {children}
        </div>
      )}
    </div>
  );
}