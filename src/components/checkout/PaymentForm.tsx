import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { useCheckoutStore } from '@/stores/checkoutStore';
import type { PaymentMethod } from '@/types/checkout';

const paymentSchema = z.object({
  type: z.enum(['card', 'paypal']),
  cardNumber: z.string().min(16, 'Valid card number is required').optional(),
  expiryDate: z.string().min(5, 'Valid expiry date is required').optional(),
  cvv: z.string().min(3, 'Valid CVV is required').optional(),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

export function PaymentForm() {
  const { setPaymentMethod } = useCheckoutStore();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      type: 'card',
    },
  });

  const paymentType = watch('type');

  const onSubmit = (data: PaymentFormData) => {
    setPaymentMethod(data as PaymentMethod);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Payment Method</label>
        <div className="mt-2 space-y-2">
          <div className="flex items-center">
            <input
              {...register('type')}
              type="radio"
              value="card"
              className="h-4 w-4 border-gray-300 text-black focus:ring-black"
            />
            <label className="ml-2 text-sm text-gray-700">Credit Card</label>
          </div>
          <div className="flex items-center">
            <input
              {...register('type')}
              type="radio"
              value="paypal"
              className="h-4 w-4 border-gray-300 text-black focus:ring-black"
            />
            <label className="ml-2 text-sm text-gray-700">PayPal</label>
          </div>
        </div>
      </div>

      {paymentType === 'card' && (
        <>
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
              Card Number
            </label>
            <input
              {...register('cardNumber')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              placeholder="1234 5678 9012 3456"
            />
            {errors.cardNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.cardNumber.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                {...register('expiryDate')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                placeholder="MM/YY"
              />
              {errors.expiryDate && (
                <p className="mt-1 text-sm text-red-600">{errors.expiryDate.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                CVV
              </label>
              <input
                {...register('cvv')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                placeholder="123"
              />
              {errors.cvv && (
                <p className="mt-1 text-sm text-red-600">{errors.cvv.message}</p>
              )}
            </div>
          </div>
        </>
      )}

      <Button type="submit" className="w-full">
        Continue to Review
      </Button>
    </form>
  );
}