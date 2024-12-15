import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface ViewCollectionButtonProps {
  categoryId: string;
  className?: string;
}

export function ViewCollectionButton({ categoryId, className }: ViewCollectionButtonProps) {
  return (
    <Link to={`/${categoryId}`}>
      <Button 
        variant="primary" 
        size="lg" 
        className={cn(
          "flex items-center gap-2 transition-transform hover:translate-x-1",
          className
        )}
      >
        View Collection
        <ArrowRight className="h-5 w-5" />
      </Button>
    </Link>
  );
}