import { useCart } from '@/context/CartContext';

export function OrderSummary() {
  const { cart } = useCart();

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-lg font-medium mb-4">Order Summary</h2>
      
      <div className="divide-y">
        {cart.items.map((item) => (
          <div key={item.product.id} className="py-4 flex justify-between">
            <div>
              <p className="font-medium">{item.product.name}</p>
              <p className="text-sm text-gray-500">Size: {item.size}</p>
              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            </div>
            <p className="font-medium">${item.product.price * item.quantity}</p>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 mt-4">
        <div className="flex justify-between mb-2">
          <p className="text-gray-500">Subtotal</p>
          <p className="font-medium">${cart.total}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p className="text-gray-500">Shipping</p>
          <p className="font-medium">Free</p>
        </div>
        <div className="flex justify-between text-lg font-medium">
          <p>Total</p>
          <p>${cart.total}</p>
        </div>
      </div>
    </div>
  );
}