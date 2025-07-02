"use client";

import { useProducts } from "@/hooks/useProduct";
import HomeBanner from "./components/home/HomeBanner";
import Products from "./components/home/Products";
import { Link } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { products, loading, error } = useProducts(8);

  return (
    <div className="flex flex-col p-[96px]">
      <HomeBanner />
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Các sản phẩm nổi bật
      </h2>

      <Products
        products={products}
        loading={loading}
        error={error ?? undefined}
      />
      <div className="mt-10 text-center">
        <Link href={"/category"}>
          <Button>Xem Thêm</Button>
        </Link>
      </div>
      {/* Why choose us */}
      <div className=""></div>
      {/* Reviews */}
      <div className=""></div>
      {/* Newsletter */}
      <div className=""></div>
    </div>
  );
}
