import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ClearFiltersButtonProps {
  onClear: () => void;
  isVisible: boolean;
}

export function ClearFiltersButton({
  onClear,
  isVisible,
}: ClearFiltersButtonProps) {
  if (!isVisible) return null;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClear}
      className="w-full flex items-center justify-center gap-2"
    >
      <X className="h-4 w-4" />
      Clear Filters
    </Button>
  );
}
