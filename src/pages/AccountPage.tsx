import { useAuthStore } from '@/stores/authStore';
import { Link } from 'react-router-dom';

export function AccountPage() {
  const { user } = useAuthStore();

  return (
    <div className="container py-16">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="font-medium mb-4">Account Details</h2>
            <p className="text-gray-600">{user?.name}</p>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        <div className="col-span-2">
          <div className="grid gap-4">
            <Link 
              to="/orders" 
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium">My Orders</h3>
              <p className="text-gray-600">View and track your orders</p>
            </Link>

            <Link 
              to="/wishlist" 
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium">Wishlist</h3>
              <p className="text-gray-600">View your saved items</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}