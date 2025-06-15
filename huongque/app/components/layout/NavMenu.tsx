"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import axiosInstance from "@/lib/axiosInstance";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
}

export default function NavMenu() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/productservice/categories")
      .then((res) => setCategories(res.data))
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <NavigationMenu className="rounded-lg flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/">Trang Chủ</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <NavigationMenuLink href="/category">Danh mục</NavigationMenuLink>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {loading ? (
                  <li>Đang tải...</li>
                ) : categories.length > 0 ? (
                  categories.map((category) => (
                    <li key={category.id}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={`/category/${category.id}`}
                          className="block p-2 hover:bg-gray-100 rounded"
                        >
                          {category.name}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))
                ) : (
                  <li>Không có danh mục</li>
                )}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
