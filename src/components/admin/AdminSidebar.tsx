import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Tags, 
  Users, 
  Settings 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/admin'
  },
  {
    label: 'Products',
    icon: ShoppingBag,
    href: '/admin/products'
  },
  {
    label: 'Collections',
    icon: Tags,
    href: '/admin/collections'
  },
  {
    label: 'Users',
    icon: Users,
    href: '/admin/users'
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/admin/settings'
  }
];

export function AdminSidebar() {
  return (
    <aside className="w-64 min-h-[calc(100vh-4rem)] bg-white border-r">
      <nav className="p-4">
        <ul className="space-y-2">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}