'use client'

import { useState } from 'react'
import { Star, StarHalf } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Review {
  id: string
  author: string
  rating: number
  comment: string
  date: string
  avatarUrl?: string
}

interface ProductReviewsProps {
  reviews: Review[]
  averageRating: number
  totalReviews: number
}

export function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && <StarHalf className="h-5 w-5 fill-yellow-400 text-yellow-400" />}
      {[...Array(5 - Math.ceil(rating))].map((_, i) => (
        <Star key={i} className="h-5 w-5 text-gray-300" />
      ))}
    </div>
  )
}

export default function ProductReviews({ reviews, averageRating, totalReviews }: ProductReviewsProps) {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState('')

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <Button onClick={() => setShowReviewForm(!showReviewForm)}>
          Write a Review
        </Button>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <RatingStars rating={averageRating} />
        <span className="text-sm text-gray-600">
          {averageRating.toFixed(1)} out of 5 ({totalReviews} reviews)
        </span>
      </div>

      {showReviewForm && (
        <div className="mt-6 rounded-lg border p-4">
          <h3 className="text-lg font-semibold">Write Your Review</h3>
          <div className="mt-4">
            <Textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Share your thoughts about this product..."
              className="min-h-[100px]"
            />
            <div className="mt-4 flex gap-2">
              <Button onClick={() => setShowReviewForm(false)}>Submit Review</Button>
              <Button variant="outline" onClick={() => setShowReviewForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 space-y-8">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-8">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={review.avatarUrl} />
                <AvatarFallback>{review.author[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{review.author}</p>
                <div className="flex items-center gap-2">
                  <RatingStars rating={review.rating} />
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
} 