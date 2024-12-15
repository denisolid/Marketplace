export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  images: string[];
  description: string;
  sizes: string[];
  category: 'women' | 'men';
  subcategory: string;
  featured?: boolean;
  new?: boolean;
}