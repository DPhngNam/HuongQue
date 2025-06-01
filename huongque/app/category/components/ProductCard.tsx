import Image from "next/image";
import React from "react";
export type ProductCardProps = {
  id: string;
  name: string;
  price: string;
  imageSrc: string;
};
export default function ProductCard({
  product,
}: {
  product: ProductCardProps;
}) {
  return (
    <div className="rounded  shadow-md bg-white">

       <Image
    src={product.imageSrc}
    alt={product.name}
    width={128}
    height={192}
    className="object-contain mx-auto drop-shadow-md"
  />

      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-600">{product.price}</p>
      </div>
    </div>
  );
}
