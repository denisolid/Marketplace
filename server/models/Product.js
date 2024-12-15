import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  images: [{
    type: String,
    required: true
  }],
  description: {
    type: String,
    required: true
  },
  sizes: [{
    type: String,
    required: true
  }],
  category: {
    type: String,
    enum: ['women', 'men'],
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Product', productSchema);