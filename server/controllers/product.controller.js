import Product from '../models/Product.js';
import { catchAsync } from '../utils/catchAsync.js';

export const getProducts = catchAsync(async (req, res) => {
  const products = await Product.find();
  res.json({ success: true, data: products });
});

export const getProductById = catchAsync(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, data: product });
});