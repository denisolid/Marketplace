import { Category } from '@/types/category';

export const CATEGORIES: Category[] = [
  {
    id: 'women',
    name: 'Women',
    description: 'Discover elegant dresses, stylish tops, and premium accessories',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80',
    subcategories: ['dresses', 'tops', 'outerwear', 'accessories']
  },
  {
    id: 'men',
    name: 'Men',
    description: 'Explore contemporary suits, casual wear, and accessories',
    image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80',
    subcategories: ['suits', 'shirts', 'outerwear', 'accessories']
  }
];