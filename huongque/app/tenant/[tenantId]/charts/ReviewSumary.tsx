"use client";

import React from "react";
import { Star,StarHalf } from "lucide-react"; // Import the star icon

const reviewsData = [
  { star: 5, percentage: 50 },
  { star: 4, percentage: 40 },
  { star: 3, percentage: 30 },
  { star: 2, percentage: 20 },
  { star: 1, percentage: 10 },
];

export default function ReviewSummary() {
  return (
    <div className="w-96 h-96 relative">
      {/* Background Card */}
      <div className="w-96 h-96 left-0 top-0 absolute bg-Colors-Background-Card rounded-2xl shadow-[0px_1px_22px_0px_rgba(107,114,128,0.08)] shadow-[0px_4px_10px_0px_rgba(107,114,128,0.04)] shadow-[0px_2px_5px_-1px_rgba(107,114,128,0.03)]" />

      {/* Main Content */}
      <div className="absolute top-6 left-6 right-6 flex flex-col items-center gap-8">
        {/* Rating Summary */}
        <div className="w-full flex flex-col items-center bg-Colors-Background-50 rounded-2xl p-4 gap-3">
          {/* Stars */}
          <div className="flex justify-center items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => {
              const rating = 4.5; // Replace with your dynamic average rating
              if (i + 1 <= Math.floor(rating)) {
                // Fully filled stars
                return (
                  <div
                    key={i}
                    className="w-9 h-9 flex items-center justify-center"
                  >
                    <Star fill="yellow" className="w-7 h-7 text-yellow-400" />
                  </div>
                );
              } else if (i < rating) {
                // Half-filled stars
                return (
                  <div
                    key={i}
                    className="w-9 h-9 flex items-center justify-center"
                  >
                    <StarHalf fill="yellow" className="w-7 h-7 text-yellow-400 opacity-50" />
                  </div>
                );
              } else {
                // Empty stars
                return (
                  <div
                    key={i}
                    className="w-9 h-9 flex items-center justify-center"
                  >
                    <Star className="w-7 h-7 text-yellow-400"/>
                  </div>
                );
              }
            })}
          </div>

          {/* Average Rating */}
          <div className="text-Colors-Text-Text-Primary text-xl font-semibold font-['Inter']">
            4.5/5
          </div>

          {/* Total Review */}
          <div className="text-center text-Colors-Text-Text-Secondary text-sm font-medium font-['Inter']">
            Total 650 customer reviews
          </div>
        </div>

        {/* Rating Breakdown */}
        <div className="w-full flex justify-between">
          {/* Left: Star & Progress */}
          <div className="flex flex-col gap-3 w-2/3">
            {reviewsData.map((item) => (
              <div key={item.star} className="flex items-center gap-2">
                {/* Star label with icon */}
                <div className="flex items-center gap-1 w-20 text-Colors-Text-Text-Secondary text-sm">
                  <Star className="w-4 h-4 text-yellow-400" /> {/* Star icon */}
                  {item.star} Star
                </div>

                {/* Progress bar background */}
                <div className="relative flex-1 h-2 rounded-full bg-[#E5E7EB] overflow-hidden">
                  {/* Progress bar foreground */}
                  <div
                    className="h-full bg-[#6950E8] rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right: % text */}
          <div className="flex flex-col gap-3 justify-start items-end">
            {reviewsData.map((item) => (
              <div
                key={item.star}
                className="text-Colors-Text-Text-Primary text-sm"
              >
                {item.percentage}%
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
