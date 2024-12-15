import { body } from 'express-validator';
import { validate } from '../../utils/validation.js';

export const createOrderValidator = [
  body('items').isArray().withMessage('Items must be an array'),
  body('items.*.product').isMongoId().withMessage('Invalid product ID'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('items.*.size').notEmpty().withMessage('Size is required'),
  
  body('shippingAddress.firstName').notEmpty().withMessage('First name is required'),
  body('shippingAddress.lastName').notEmpty().withMessage('Last name is required'),
  body('shippingAddress.address').notEmpty().withMessage('Address is required'),
  body('shippingAddress.city').notEmpty().withMessage('City is required'),
  body('shippingAddress.country').notEmpty().withMessage('Country is required'),
  body('shippingAddress.postalCode').notEmpty().withMessage('Postal code is required'),
  body('shippingAddress.phone').notEmpty().withMessage('Phone is required'),
  
  body('paymentMethod')
    .isIn(['card', 'paypal'])
    .withMessage('Invalid payment method'),
  
  validate
];

export const updateOrderStatusValidator = [
  body('status')
    .isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
    .withMessage('Invalid order status'),
  
  validate
];