import { Product } from '@/types/product';

export const PRODUCTS: Product[] = [
  // Women's Products
  {
    id: '1',
    name: 'Embroidered Linen Dress',
    brand: 'FROLOV',
    price: 299,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?auto=format&fit=crop&q=80'
    ],
    description: 'Handcrafted linen dress with traditional Ukrainian embroidery patterns.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'women',
    subcategory: 'dresses',
    featured: true,
    new: true
  },
  {
    id: '2',
    name: 'Minimalist Wool Coat',
    brand: 'BEVZA',
    price: 599,
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80'
    ],
    description: 'Premium wool coat with clean lines and modern silhouette.',
    sizes: ['S', 'M', 'L'],
    category: 'women',
    subcategory: 'outerwear',
    featured: true,
    new: true
  },
  {
    id: '3',
    name: 'Silk Evening Gown',
    brand: 'LAKE Studio',
    price: 799,
    images: [
      'https://images.unsplash.com/photo-1571908598047-29b5b90dae68?auto=format&fit=crop&q=80'
    ],
    description: 'Elegant silk evening gown with delicate hand-beaded details.',
    sizes: ['XS', 'S', 'M', 'L'],
    category: 'women',
    subcategory: 'dresses',
    featured: true,
    new: false
  },

  // Men's Products
  {
    id: '4',
    name: 'Modern Wool Suit',
    brand: 'FROLOV',
    price: 899,
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80'
    ],
    description: 'Contemporary wool suit with perfect tailoring and modern fit.',
    sizes: ['48', '50', '52', '54'],
    category: 'men',
    subcategory: 'suits',
    featured: true,
    new: true
  },
  {
    id: '5',
    name: 'Linen Blazer',
    brand: 'BEVZA',
    price: 499,
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80'
    ],
    description: 'Lightweight linen blazer perfect for summer occasions.',
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'men',
    subcategory: 'suits',
    featured: false,
    new: true
  },
  {
    id: '6',
    name: 'Cotton Oxford Shirt',
    brand: 'LAKE Studio',
    price: 159,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80'
    ],
    description: 'Classic oxford shirt made from premium cotton.',
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'men',
    subcategory: 'shirts',
    featured: true,
    new: false
  },
  {
    id: '7',
    name: 'Wool Overcoat',
    brand: 'FROLOV',
    price: 799,
    images: [
      'https://images.unsplash.com/photo-1544736779-50ec8c5b52c5?auto=format&fit=crop&q=80'
    ],
    description: 'Classic wool overcoat with modern details.',
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'men',
    subcategory: 'outerwear',
    featured: true,
    new: true
  },
  {
    id: '8',
    name: 'Leather Oxford Shoes',
    brand: 'BEVZA',
    price: 329,
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80'
    ],
    description: 'Handcrafted leather oxford shoes with traditional craftsmanship.',
    sizes: ['40', '41', '42', '43', '44', '45'],
    category: 'men',
    subcategory: 'accessories',
    featured: false,
    new: false
  },
  {
    id: '9',
    name: 'Silk Tie',
    brand: 'LAKE Studio',
    price: 89,
    images: [
      'https://images.unsplash.com/photo-1589756823695-278bc923f962?auto=format&fit=crop&q=80'
    ],
    description: 'Premium silk tie with subtle pattern.',
    sizes: ['ONE SIZE'],
    category: 'men',
    subcategory: 'accessories',
    featured: false,
    new: true
  },
  {
    id: '10',
    name: 'Cashmere Sweater',
    brand: 'FROLOV',
    price: 399,
    images: [
      'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?auto=format&fit=crop&q=80'
    ],
    description: 'Luxurious cashmere sweater with minimalist design.',
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'men',
    subcategory: 'shirts',
    featured: true,
    new: true
  }
];