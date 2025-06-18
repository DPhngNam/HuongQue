"use client";
import Product from "@/app/components/products/Product";
import { ProductProps } from "@/app/models/Product.model";
import { useCategoryStore } from "@/app/stores/categoryStore";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";
import React, { useState } from "react";

export default function CategoryPageContent({
  categorySlug,
}: {
  categorySlug?: string;
}) {
  const [sort, setSort] = useState<"newest" | "bestseller">("newest");
  const [products, setProducts] = React.useState<ProductProps[]>([]);
  const { categories } = useCategoryStore();
  console.log("Categories", categories);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "productservice/all";
        if (categorySlug) {
          url = `productservice/category/${categorySlug}`;
        }
        const res = await axiosInstance.get(url);
        setProducts(res.data || []);
      } catch (error) {
        setProducts([]);
      }
    };
    fetchProducts();
  }, [categorySlug]);
  return (
    <div className="flex justify-center  items-start flex-col p-[96px]">
      <CategoryBreadcrumb categorySlug={categorySlug} />
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-6">Danh mục sản phẩm</h1>
        <p className="text-gray-600 mb-4">
          Dưới đây là danh sách các danh mục sản phẩm của chúng tôi. Bạn có thể
          chọn một danh mục để xem các sản phẩm liên quan.
        </p>
        <div className="mb-4">
          <label htmlFor="category-select" className="mr-2 font-medium">
            Chọn danh mục:
          </label>
          {categories.length > 0 ? (
            <select
              id="category-select"
              className="w-[220px] border rounded px-3 py-2"
              value={categorySlug || ""}
              onChange={(e) => {
                const value = e.target.value;
                if (!value) {
                  window.location.href = "/category";
                } else {
                  window.location.href = `/category/${value}`;
                }
              }}
            >
              <option value="">Tất cả danh mục</option>
              {categories
                .filter(
                  (cat) =>
                    typeof cat.slug === "string" &&
                    cat.slug &&
                    !cat.slug.includes("/")
                )
                .map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
            </select>
          ) : (
            <p>Không có danh mục nào</p>
          )}
        </div>
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
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
function CategoryBreadcrumb({ categorySlug }: { categorySlug?: string }) {
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
          {categorySlug ? (
            <BreadcrumbPage>{categorySlug}</BreadcrumbPage>
          ) : (
            <BreadcrumbPage>Tất cả</BreadcrumbPage>
          )}
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
