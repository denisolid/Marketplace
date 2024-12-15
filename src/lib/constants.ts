export const CURRENCY = {
  USD: {
    symbol: '$',
    code: 'USD'
  }
};

export const SHIPPING_METHODS = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    price: 0,
    estimatedDays: '3-5'
  },
  {
    id: 'express',
    name: 'Express Shipping',
    price: 15,
    estimatedDays: '1-2'
  }
];

export const PAYMENT_METHODS = {
  CARD: 'card',
  PAYPAL: 'paypal'
} as const;