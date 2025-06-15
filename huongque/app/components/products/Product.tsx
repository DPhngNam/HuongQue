import { ProductProps } from "../../models/Product.model";
import Link from "next/link";
import Image from "next/image";

export default function Product({ product }: { product: ProductProps }) {
  return (
    <div className="group relative">
      <div className="relative">
        <Link href={`/products/${product.id}`}>
          <Image
            alt="Product Image"
            src={product.images[0] || "/image/default.png"}
            width={500}
            height={500}
            className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
          />
        </Link>
        {product.label && (
          <div className="absolute top-2 right-2">
            <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
              {product.label}
            </span>
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link
              href={`/products/${product.id}`}
              className="hover:text-indigo-600"
            >
              {product.name}
            </Link>
          </h3>
        </div>
        <p className="text-sm font-medium text-gray-900">
          {!product.price || product.price === 0
            ? "Liên hệ"
            : product.price.toLocaleString("vi-VN") + " ₫"}
        </p>
      </div>
    </div>
  );
}
