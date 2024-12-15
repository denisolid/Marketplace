import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatDate, formatPrice } from '@/lib/utils/format';

interface Order {
  id: string;
  createdAt: string;
  status: string;
  total: number;
}

// Simulated orders data
const MOCK_ORDERS: Order[] = [
  {
    id: '1',
    createdAt: '2024-03-10T10:00:00Z',
    status: 'delivered',
    total: 299
  },
  {
    id: '2',
    createdAt: '2024-03-05T15:30:00Z',
    status: 'processing',
    total: 599
  }
];

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders(MOCK_ORDERS);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="container py-16">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-16">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500">You haven't placed any orders yet</p>
          <Link to="/products" className="text-black hover:underline mt-2 inline-block">
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              to={`/orders/${order.id}`}
              className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Order #{order.id}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Placed on {formatDate(order.createdAt)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatPrice(order.total)}</p>
                  <p className="text-sm text-gray-500 mt-1 capitalize">{order.status}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}