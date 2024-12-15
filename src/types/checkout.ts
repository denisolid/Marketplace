export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  phone: string;
}

export interface PaymentMethod {
  type: 'card' | 'paypal';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
}

export interface CheckoutState {
  shippingAddress: ShippingAddress | null;
  paymentMethod: PaymentMethod | null;
  step: 'shipping' | 'payment' | 'review';
}