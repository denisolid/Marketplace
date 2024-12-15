import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { 
    label: 'New Arrivals',
    href: '/new-arrivals'
  },
  {
    label: 'Women',
    href: '/women'
  },
  {
    label: 'Men',
    href: '/men'
  },
  {
    label: 'Brands',
    href: '/brands'
  }
];

export function MainNav() {
  const location = useLocation();

  return (
    <nav className="hidden lg:flex items-center space-x-8">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-neutral-600",
            location.pathname === item.href && "text-black font-semibold"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}