import { Card } from '@/components/ui/Card';
import { 
  ShoppingBag, 
  Users, 
  DollarSign,
  TrendingUp 
} from 'lucide-react';

const STATS = [
  {
    label: 'Total Products',
    value: '248',
    icon: ShoppingBag,
    trend: '+12%'
  },
  {
    label: 'Total Users',
    value: '1,024',
    icon: Users,
    trend: '+18%'
  },
  {
    label: 'Revenue',
    value: '$84,232',
    icon: DollarSign,
    trend: '+24%'
  }
];

export function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STATS.map((stat) => (
          <Card key={stat.label} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <stat.icon className="h-8 w-8 text-gray-400" />
            </div>
            <div className="flex items-center mt-4 text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              {stat.trend} from last month
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}