import Product from '../models/Product.js';

export class ProductService {
  static async getProducts(filters = {}) {
    const query = this.buildQuery(filters);
    return await Product.find(query)
      .populate('brand')
      .sort(filters.sort || '-createdAt');
  }

  static async getProductById(id) {
    const product = await Product.findById(id).populate('brand');
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  static buildQuery(filters) {
    const query = {};

    if (filters.category) {
      query.category = filters.category;
    }

    if (filters.brand) {
      query.brand = filters.brand;
    }

    if (filters.priceRange) {
      query.price = {
        $gte: filters.priceRange[0],
        $lte: filters.priceRange[1]
      };
    }

    if (filters.search) {
      query.$or = [
        { name: { $regex: filters.search, $options: 'i' } },
        { description: { $regex: filters.search, $options: 'i' } }
      ];
    }

    return query;
  }
}