import { useCheckoutStore } from '@/stores/checkoutStore';
import { ShippingForm } from '@/components/checkout/ShippingForm';
import { PaymentForm } from '@/components/checkout/PaymentForm';
import { OrderReview } from '@/components/checkout/OrderReview';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { CheckoutSteps } from '@/components/checkout/CheckoutSteps';

export function CheckoutPage() {
  const { step } = useCheckoutStore();

  return (
    <div className="container py-16">
      <div className="max-w-7xl mx-auto">
        <CheckoutSteps />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="space-y-8">
              {step === 'shipping' && (
                <>
                  <h2 className="text-xl font-medium">Shipping Information</h2>
                  <ShippingForm />
                </>
              )}

              {step === 'payment' && (
                <>
                  <h2 className="text-xl font-medium">Payment Information</h2>
                  <PaymentForm />
                </>
              )}

              {step === 'review' && (
                <>
                  <h2 className="text-xl font-medium">Review Order</h2>
                  <OrderReview />
                </>
              )}
            </div>
          </div>

          <div>
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}