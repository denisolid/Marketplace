import Cart from '../models/Cart.js';

export class CartService {
  static async getCart(userId) {
    let cart = await Cart.findOne({ user: userId })
      .populate('items.product');
    
    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }

    return cart;
  }

  static async addToCart(userId, { productId, quantity, size }) {
    const cart = await this.getCart(userId);
    
    const existingItem = cart.items.find(
      item => item.product.toString() === productId && item.size === size
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity, size });
    }

    await cart.save();
    return cart.populate('items.product');
  }

  static async updateCartItem(userId, productId, { quantity, size }) {
    const cart = await this.getCart(userId);
    
    const item = cart.items.find(
      item => item.product.toString() === productId
    );

    if (!item) {
      throw new Error('Item not found in cart');
    }

    if (quantity === 0) {
      cart.items = cart.items.filter(
        item => item.product.toString() !== productId
      );
    } else {
      item.quantity = quantity;
      if (size) item.size = size;
    }

    await cart.save();
    return cart.populate('items.product');
  }

  static async clearCart(userId) {
    const cart = await this.getCart(userId);
    cart.items = [];
    await cart.save();
    return cart;
  }
}