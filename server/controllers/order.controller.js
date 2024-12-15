import { asyncHandler } from '../utils/asyncHandler.js';
import { OrderService } from '../services/order.service.js';
import { CartService } from '../services/cart.service.js';

export const createOrder = asyncHandler(async (req, res) => {
  const order = await OrderService.createOrder(req.user._id, req.body);
  await CartService.clearCart(req.user._id);

  res.status(201).json({
    status: 'success',
    data: order
  });
});

export const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await OrderService.getUserOrders(req.user._id);
  
  res.json({
    status: 'success',
    results: orders.length,
    data: orders
  });
});

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await OrderService.getOrderById(req.params.id, req.user._id);
  
  res.json({
    status: 'success',
    data: order
  });
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await OrderService.updateOrderStatus(
    req.params.id,
    req.body.status,
    req.user._id
  );
  
  res.json({
    status: 'success',
    data: order
  });
});