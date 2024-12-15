import Order from '../models/Order.js';

export class OrderService {
  static async createOrder(userId, orderData) {
    const order = await Order.create({
      user: userId,
      ...orderData,
      status: 'pending'
    });

    return order.populate('items.product');
  }

  static async getUserOrders(userId) {
    return await Order.find({ user: userId })
      .populate('items.product')
      .sort('-createdAt');
  }

  static async getOrderById(orderId, userId) {
    const order = await Order.findById(orderId)
      .populate('items.product');

    if (!order) {
      throw new Error('Order not found');
    }

    // Ensure user owns this order
    if (order.user.toString() !== userId) {
      throw new Error('Not authorized to view this order');
    }

    return order;
  }

  static async updateOrderStatus(orderId, status, userId) {
    const order = await Order.findById(orderId);
    
    if (!order) {
      throw new Error('Order not found');
    }

    if (order.user.toString() !== userId) {
      throw new Error('Not authorized to update this order');
    }

    order.status = status;
    await order.save();
    
    return order;
  }
}