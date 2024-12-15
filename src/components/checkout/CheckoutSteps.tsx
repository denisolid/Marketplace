import { useCheckoutStore } from '@/stores/checkoutStore';
import { cn } from '@/lib/utils';

const steps = [
  { id: 'shipping', name: 'Shipping' },
  { id: 'payment', name: 'Payment' },
  { id: 'review', name: 'Review' },
];

export function CheckoutSteps() {
  const { step } = useCheckoutStore();

  return (
    <nav aria-label="Progress" className="mb-8">
      <ol className="flex items-center">
        {steps.map((s, index) => (
          <li
            key={s.id}
            className={cn(
              'relative flex-1',
              index !== steps.length - 1 ? 'pr-8' : ''
            )}
          >
            <div className="flex items-center">
              <span
                className={cn(
                  'h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium',
                  {
                    'bg-black text-white': s.id === step,
                    'bg-gray-100': s.id !== step,
                    'text-gray-900': s.id !== step && steps.indexOf({ id: step } as any) > steps.indexOf(s),
                    'text-gray-400': s.id !== step && steps.indexOf({ id: step } as any) <= steps.indexOf(s),
                  }
                )}
              >
                {index + 1}
              </span>
              {index !== steps.length - 1 && (
                <div
                  className={cn('h-0.5 w-full ml-4', {
                    'bg-black': steps.indexOf({ id: step } as any) > index,
                    'bg-gray-200': steps.indexOf({ id: step } as any) <= index,
                  })}
                />
              )}
            </div>
            <span className="absolute left-0 top-10 text-sm font-medium text-gray-500">
              {s.name}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
}