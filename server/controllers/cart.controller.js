import { asyncHandler } from '../utils/asyncHandler.js';
import { CartService } from '../services/cart.service.js';

export const getCart = asyncHandler(async (req, res) => {
  const cart = await CartService.getCart(req.user._id);
  
  res.json({
    status: 'success',
    data: cart
  });
});

export const addToCart = asyncHandler(async (req, res) => {
  const cart = await CartService.addToCart(req.user._id, req.body);
  
  res.json({
    status: 'success',
    data: cart
  });
});

export const updateCartItem = asyncHandler(async (req, res) => {
  const cart = await CartService.updateCartItem(
    req.user._id,
    req.params.productId,
    req.body
  );
  
  res.json({
    status: 'success',
    data: cart
  });
});

export const clearCart = asyncHandler(async (req, res) => {
  const cart = await CartService.clearCart(req.user._id);
  
  res.json({
    status: 'success',
    data: cart
  });
});