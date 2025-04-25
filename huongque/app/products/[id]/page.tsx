'use client'

import { products } from "@/app/utils/homeData";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { notFound } from "next/navigation";
import { use } from "react";

type PageParams = {
  id: string;
};

export default function ProductDetail({ params }: { params: Promise<PageParams> }) {
  const unwrappedParams = use(params);
  const product = products.find(p => p.id === parseInt(unwrappedParams.id));
  
  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl px-4 py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Image */}
          <div className="aspect-h-1 aspect-w-1 w-full">
            <img
              src={product.imageSrc}
              alt={product.imageAlt}
              className="h-full w-full object-cover object-center rounded-lg"
            />
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">{product.price}</p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6 text-base text-gray-700">
                <p>Color: {product.color}</p>
                {product.label && (
                  <p className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                    {product.label}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 