import { useCheckoutStore } from '@/stores/checkoutStore';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';

export function OrderReview() {
  const { shippingAddress, paymentMethod } = useCheckoutStore();
  const { cart } = useCart();

  const handlePlaceOrder = async () => {
    // In a real application, this would make an API call to create the order
    console.log('Order placed', {
      items: cart.items,
      total: cart.total,
      shippingAddress,
      paymentMethod,
    });
  };

  if (!shippingAddress || !paymentMethod) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Shipping Address</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p>{shippingAddress.firstName} {shippingAddress.lastName}</p>
          <p>{shippingAddress.address}</p>
          <p>{shippingAddress.city}, {shippingAddress.country} {shippingAddress.postalCode}</p>
          <p>{shippingAddress.phone}</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Payment Method</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          {paymentMethod.type === 'card' ? (
            <p>Credit Card ending in {paymentMethod.cardNumber?.slice(-4)}</p>
          ) : (
            <p>PayPal</p>
          )}
        </div>
      </div>

      <Button onClick={handlePlaceOrder} className="w-full">
        Place Order
      </Button>
    </div>
  );
}