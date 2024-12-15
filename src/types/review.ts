export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ProductReview {
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
}