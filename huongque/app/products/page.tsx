'use client'

import { products } from "@/app/utils/homeData";
import Product from "@/app/components/products/Product";
import BreadcrumbNav from "@/app/components/ui/breadcrumb-nav";

export default function ProductsPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products" }
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl px-4 py-4">
        <BreadcrumbNav items={breadcrumbItems} />
      </div>

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">All Products</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Product 
              key={product.id}
              id={product.id}
              label={product.label}
              name={product.name}
              imageSrc={product.imageSrc}
              imageAlt={product.imageAlt}
              price={product.price}
              color={product.color} 
            />
          ))}
        </div>
      </div>
    </div>
  );
} 