import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { formatDate, formatPrice } from '@/lib/utils/format';

interface OrderDetail {
  id: string;
  createdAt: string;
  status: string;
  total: number;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    size: string;
    image: string;
  }>;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
  };
}

// Simulated order data
const MOCK_ORDER: OrderDetail = {
  id: '1',
  createdAt: '2024-03-10T10:00:00Z',
  status: 'delivered',
  total: 299,
  items: [
    {
      id: '1',
      name: 'Embroidered Linen Dress',
      price: 299,
      quantity: 1,
      size: 'M',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80'
    }
  ],
  shippingAddress: {
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St',
    city: 'Kyiv',
    country: 'Ukraine',
    postalCode: '01001'
  }
};

export function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrder(MOCK_ORDER);
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="container py-16">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container py-16">
        <p className="text-center text-gray-500">Order not found</p>
      </div>
    );
  }

  return (
    <div className="container py-16">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold">Order #{order.id}</h1>
          <p className="text-gray-500 mt-2">
            Placed on {formatDate(order.createdAt)}
          </p>
        </div>
        <div className="text-right">
          <p className="font-medium">{formatPrice(order.total)}</p>
          <p className="text-sm text-gray-500 mt-1 capitalize">{order.status}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-medium mb-4">Order Items</h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-white p-4 rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  <p className="mt-1 font-medium">{formatPrice(item.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-medium mb-4">Shipping Address</h2>
          <div className="bg-white p-6 rounded-lg">
            <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
            <p>{order.shippingAddress.address}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.country}{' '}
              {order.shippingAddress.postalCode}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}