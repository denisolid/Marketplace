import { create } from 'zustand';
import { CheckoutState, ShippingAddress, PaymentMethod } from '@/types/checkout';

interface CheckoutStore extends CheckoutState {
  setShippingAddress: (address: ShippingAddress) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setStep: (step: CheckoutState['step']) => void;
  reset: () => void;
}

const initialState: CheckoutState = {
  shippingAddress: null,
  paymentMethod: null,
  step: 'shipping',
};

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  ...initialState,

  setShippingAddress: (address) => {
    set({ shippingAddress: address, step: 'payment' });
  },

  setPaymentMethod: (method) => {
    set({ paymentMethod: method, step: 'review' });
  },

  setStep: (step) => {
    set({ step });
  },

  reset: () => {
    set(initialState);
  },
}));