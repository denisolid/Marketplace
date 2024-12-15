import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/stores/authStore';
import type { ProductReview } from '@/types/review';

interface ProductReviewsProps {
  productId: string;
  reviews: ProductReview;
}

export function ProductReviews({ productId, reviews }: ProductReviewsProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { isAuthenticated } = useAuthStore();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">Customer Reviews</h2>
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              {renderStars(reviews.averageRating)}
            </div>
            <span className="ml-2 text-sm text-gray-500">
              Based on {reviews.totalReviews} reviews
            </span>
          </div>
        </div>
        {isAuthenticated && (
          <Button onClick={() => setShowReviewForm(!showReviewForm)}>
            Write a Review
          </Button>
        )}
      </div>

      <div className="space-y-8">
        {reviews.reviews.map((review) => (
          <div key={review.id} className="border-b pb-8">
            <div className="flex items-center mb-2">
              {renderStars(review.rating)}
              <span className="ml-2 font-medium">{review.userName}</span>
            </div>
            <p className="text-gray-600">{review.comment}</p>
            <time className="text-sm text-gray-500 mt-2 block">
              {new Date(review.createdAt).toLocaleDateString()}
            </time>
          </div>
        ))}
      </div>
    </div>
  );
}