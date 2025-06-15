"use client";

import { ProductProps } from "@/app/models/Product.model";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { memo, useCallback, useEffect, useState } from "react";
import Product from "../products/Product";
import { Button } from "@/components/ui/button";

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

export default function HomeProducts({
  products,
}: {
  products: ProductProps[];
}) {
  const [showAll, setShowAll] = useState(false);
  const isLoading = useLoadingState();

  const hasMoreProducts = products.length > 8;

  const handleShowMore = useCallback(() => {
    setShowAll((prev) => !prev);
  }, []);

  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Các sản phẩm nổi bật
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {isLoading
            ? // Show 8 skeleton items while loading
              Array.from({ length: 8 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))
            : products.map((product) => (
                <Product product={product} key={product.id} />
              ))}
        </div>

        <div className="mt-10 text-center">
          <Link href={"/category"}>
          <Button>
            Xem Thêm
          </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
