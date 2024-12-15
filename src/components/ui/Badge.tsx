import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'secondary';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        {
          'bg-black text-white': variant === 'default',
          'border border-neutral-200 text-neutral-900': variant === 'outline',
          'bg-neutral-100 text-neutral-900': variant === 'secondary',
        },
        className
      )}
    >
      {children}
    </span>
  );
}