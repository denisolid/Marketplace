import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function NavLink({ href, children, className }: NavLinkProps) {
  return (
    <a 
      href={href} 
      className={cn(
        "text-sm font-medium hover:text-neutral-600 transition-colors",
        className
      )}
    >
      {children}
    </a>
  );
}