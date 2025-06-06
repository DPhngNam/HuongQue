"use client";

import React from "react";
import { CiMenuBurger } from "react-icons/ci";
import { IoLogoChrome } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/app/stores/cartStore";
import { useAuthStore } from "@/app/stores/authStore";
import { Button } from "@/components/ui/button";
import NavMenu from "./NavMenu";

export default function Header() {
  const router = useRouter();
  const isLogin = useAuthStore((state) => state.isLogin());
  const totalItems = useCartStore((state) => state.totalItems);

  const handleCartClick = () => {
    router.push("/cart");
  };

  const handleUserClick = () => {
    router.push("/settings");
  };

  return (
    <nav className="flex z-50 justify-between items-center bg-transparent px-3 py-2">
      <Link href={"/"} className="flex items-center gap-1 ">
        <IoLogoChrome className="text-2xl" />
        <span className="font-bold text-2xl ">Hương Quê</span>
      </Link>
      <NavMenu />
        
      
      <div className="flex gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <IoSearch className="text-xl" />
        </button>
        <button
          className="p-2 rounded-full hover:bg-gray-100 relative"
          onClick={handleCartClick}
        >
          <FiShoppingCart className="text-xl" />
          {totalItems > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
              {totalItems > 99 ? "99+" : totalItems}
            </div>
          )}
        </button>
        {isLogin ? (
          <button
            className="p-2 rounded-full hover:bg-gray-100"
            onClick={handleUserClick}
          >
            <FaRegUser className="text-xl" />
          </button>
        ) : (
          <Button>
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}
