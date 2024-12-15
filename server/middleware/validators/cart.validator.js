import { body } from 'express-validator';
import { validate } from '../../utils/validation.js';

export const addToCartValidator = [
  body('productId').isMongoId().withMessage('Invalid product ID'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('size').notEmpty().withMessage('Size is required'),
  validate
];

export const updateCartItemValidator = [
  body('quantity').isInt({ min: 0 }).withMessage('Quantity must be 0 or greater'),
  body('size').optional().notEmpty().withMessage('Size cannot be empty'),
  validate
];