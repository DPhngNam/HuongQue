import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { ProductProps } from "@/app/models/Product.model";

export function useProducts(count = 10) {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosInstance.get(`/productservice/top?count=${count}`);
        setProducts(res.data || []);
      } catch (error: any) {
        setProducts([]);
        setError("Không thể tải sản phẩm");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [count]);

  return { products, loading, error };
}