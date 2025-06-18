import { create } from "zustand";

interface CategoryState {
  categories: Array<{ id: string; name: string; slug: string }>;
  setCategories: (
    categories: Array<{ id: string; name: string; slug: string }>
  ) => void;
  selectedCategory: string | null;
  setSelectedCategory: (slug: string | null) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),
  selectedCategory: null,
  setSelectedCategory: (slug) => set({ selectedCategory: slug }),
}));
