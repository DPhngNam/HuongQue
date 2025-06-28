"use client";

import { useAuthStore } from "@/app/stores/authStore";
import { useCartStore } from "@/app/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { NotificationDropdown } from "./NotificationDropdown";
import NavMenu from "./NavMenu";

export default function Header() {
  const router = useRouter();
  const isLogin = useAuthStore((state) => state.isLogin());
  const totalItems = useCartStore((state) => state.totalItems); // Always call the hook
  const displayTotalItems = isLogin ? totalItems : 0; // Use conditional logic here instead

  const handleCartClick = () => {
    router.push("/cart");
  };

  const handleUserClick = () => {
    router.push("/settings");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Image
            src="/image/logo.png"
            alt="Hương Quê Logo"
            width={50}
            height={50}
          />
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-2xl">Hương Quê</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <NavMenu />
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[300px]"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isLogin && <NotificationDropdown />}
            {
              isLogin && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCartClick}
                  className="relative"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      {totalItems > 99 ? "99+" : totalItems}
                    </div>
                  )}
                </Button>
              )
            }

            {isLogin ? (
              <Button variant="ghost" size="icon" onClick={handleUserClick}>
                <User className="h-5 w-5" />
              </Button>
            ) : (
              <Button asChild>
                <Link href="/login">Đăng nhập</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
