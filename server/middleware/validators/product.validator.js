import { query } from 'express-validator';
import { validate } from '../../utils/validation.js';

export const getProductsValidator = [
  query('category')
    .optional()
    .isIn(['women', 'men'])
    .withMessage('Invalid category'),
  
  query('price')
    .optional()
    .matches(/^\d+-\d+$/)
    .withMessage('Price range must be in format min-max'),
  
  query('sort')
    .optional()
    .isIn(['price-asc', 'price-desc', 'newest'])
    .withMessage('Invalid sort parameter'),
  
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50'),
  
  validate
];