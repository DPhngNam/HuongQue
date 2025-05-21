'use client'

import { ProductProps } from "@/app/models/Product.model"
import ShopProduct from "@/app/components/shop/ShopProduct"

interface ProductsSectionProps {
  title: string;
  description: string;
  products: ProductProps[];
}

export default function ProductsSection({ title, description, products }: ProductsSectionProps) {
  return (
    <div id="products" className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 w-full">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
      <p className="mt-4 text-gray-500">{description}</p>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.map((product: ProductProps) => (
          <ShopProduct 
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
  )
}
