"use client";

import { ProductProps } from "@/app/models/Product.model";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { JSX, memo, useCallback, useEffect, useState } from "react";
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
interface ProductsProps {
  products: ProductProps[];
  loading?: boolean;
  error?: string;
}
export default function Products({
  products,
  loading,
  error,
}: ProductsProps) {
  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    
        {error && (
          <div className="mb-4 text-center text-red-500 font-medium">
            {error}
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {loading
            ? // Show 8 skeleton items while loading
              Array.from({ length: 8 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))
            : products.map((product) => (
                <Product product={product} key={product.id} />
              ))}
        </div>

        
      </div>
    </div>
  );
}
