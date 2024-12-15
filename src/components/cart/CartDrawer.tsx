import { useState } from 'react';
import { ShoppingBag, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl p-6 overflow-y-auto z-50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Shopping Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {cart.items.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-4 text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="divide-y">
              {cart.items.map((item) => (
                <div key={item.product.id} className="py-6">
                  <div className="flex items-center">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="h-20 w-20 rounded object-cover"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">Size: {item.size}</p>
                      <p className="mt-1">${item.product.price}</p>
                    </div>
                    <div className="ml-4">
                      <select
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.product.id, Number(e.target.value))}
                        className="rounded border-gray-200 p-1"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="mt-2 text-sm text-red-600 block"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t pt-6">
              <div className="flex justify-between text-lg font-medium">
                <span>Total</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
              <Link to="/checkout">
                <Button className="mt-6 w-full" onClick={onClose}>
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}