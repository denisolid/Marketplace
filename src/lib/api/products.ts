import { Product } from "@/types/product";

// Simulated product data
const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Embroidered Linen Dress",
    brand: "FROLOV",
    price: 299,
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80",
    ],
    description:
      "Handcrafted linen dress with traditional Ukrainian embroidery patterns.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["red", "navy", "black"],
    subcategory: "dresses",
    tags: ["embroidered", "linen", "summer"],
    category: "women",
  },
  {
    id: "2",
    name: "Minimalist Wool Coat",
    brand: "BEVZA",
    price: 599,
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80",
    ],
    description: "Premium wool coat with clean lines and modern silhouette.",
    sizes: ["S", "M", "L"],
    colors: ["white", "beige"],
    category: "women",
    subcategory: "outerwear",
    tags: ["minimalist", "wool", "winter"],
  },
];

export async function getProducts(
  filters?: Record<string, any>
): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filteredProducts = [...PRODUCTS];

  if (filters?.category) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === filters.category
    );
  }

  if (filters?.priceRange) {
    const [min, max] = filters.priceRange;
    filteredProducts = filteredProducts.filter(
      (p) => p.price >= min && p.price <= max
    );
  }

  return filteredProducts;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return PRODUCTS.find((p) => p.id === id);
}
