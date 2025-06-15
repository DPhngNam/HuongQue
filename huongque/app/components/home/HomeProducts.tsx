"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { memo, useCallback, useEffect, useState } from "react";
import { products } from "../../utils/homeData";
import Product from "../products/Product";

// Memoized ProductSkeleton component
const ProductSkeleton = memo(() => (
  <div className="group relative">
    <div className="relative">
      <Skeleton className="aspect-square w-full rounded-md lg:aspect-auto lg:h-80" />
      <div className="absolute top-2 right-2">
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
    </div>
    <div className="mt-4 flex justify-between">
      <div>
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-1 h-4 w-24" />
      </div>
      <Skeleton className="h-4 w-16" />
    </div>
  </div>
));

ProductSkeleton.displayName = "ProductSkeleton";

// Custom hook for loading state
const useLoadingState = (delay: number = 1000) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return isLoading;
};

export default function HomeProducts() {
  const [showAll, setShowAll] = useState(false);
  const isLoading = useLoadingState();
  const displayedProducts = showAll ? products : products.slice(0, 8);
  const hasMoreProducts = products.length > 8;

  const handleShowMore = useCallback(() => {
    setShowAll((prev) => !prev);
  }, []);

  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Các sản phẩm nổi
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {isLoading
            ? // Show 8 skeleton items while loading
              Array.from({ length: 8 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))
            : displayedProducts.map((product) => (
                <Product product={product} key={product.id} />
              ))}
        </div>

        {hasMoreProducts && !isLoading && (
          <div className="mt-10 text-center">
            <button
              onClick={handleShowMore}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {showAll ? "Ẩn bớt" : "Xem thêm"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
