"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ProductCard from "./components/ProductCard";
import Link from "next/link";
const products = Array.from({ length: 20 }, (_, i) => ({
  id: (i + 1).toString(),
  name: `Sản phẩm mẫu ${i + 1}`,
  price: `${100_000 + i * 10_000}đ`,
  imageSrc: "/image/Product.png",
}));

export default function Page() {
  const [sort, setSort] = useState<"newest" | "bestseller">("newest");

  return (
    <div className="flex justify-center  items-start flex-col p-[96px]">
      <CategoryBreadcrumb />
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-6">Danh mục sản phẩm</h1>
        <p className="text-gray-600 mb-4">
          Dưới đây là danh sách các danh mục sản phẩm của chúng tôi. Bạn có thể
          chọn một danh mục để xem các sản phẩm liên quan.
        </p>
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <p>Sắp xếp theo</p>
          <Button
            variant={sort === "newest" ? "default" : "outline"}
            onClick={() => setSort("newest")}
          >
            Mới nhất
          </Button>
          <Button
            variant={sort === "bestseller" ? "default" : "outline"}
            onClick={() => setSort("bestseller")}
          >
            Bán chạy
          </Button>
        </div>

        <select className=" border-1 ">
          <option>Giá</option>
          <option value="asc">Giá: Thấp đến Cao</option>
          <option value="desc">Giá: Cao đến Thấp</option>
          <option value="rating">Đánh giá</option>
        </select>
      </div>
      <div className="mt-6 grid w-full grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}
function CategoryBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Danh mục</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Tất cả</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
