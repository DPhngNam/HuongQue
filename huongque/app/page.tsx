'use client';

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import HomeBanner from "./components/home/HomeBanner";
import HomeProducts from "./components/home/HomeProducts";
import { ProductProps } from "./models/Product.model";

export default function Home() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/productservice/top?count=10");
        setProducts(res.data || []);
      } catch (error: any) {
        console.error("Failed to fetch products:", error);
        // Handle network errors or server unavailable
        if (!error.response) {
          console.error("Network error or server unavailable");
        } else {
          console.error("Server responded with error:", error.response.status);
        }
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col p-[96px]">
      <HomeBanner />
      <HomeProducts products={products} />
      {/* Why choose us */}
      <div className=""></div>
      {/* Reviews */}
      <div className=""></div>
      {/* Newsletter */}
      <div className=""></div>
    </div>
  );
}