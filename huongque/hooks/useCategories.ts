import { useCategoryStore } from "@/app/stores/categoryStore";
import axiosInstance from "@/lib/axiosInstance";
import { useEffect, useState } from "react";

export function useCategories() {
  const setCategories = useCategoryStore((state) => state.setCategories);
  const categories = useCategoryStore((state) => state.categories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/productservice/categories")
      .then((res) => setCategories(res.data))
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, [setCategories]);

  return { categories, loading };
}
