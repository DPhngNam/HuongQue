import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { IoLogoChrome } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import NavMenu from "./NavMenu";

type HeaderProps = {
  isLogin: boolean;
  totalItems: number;
};

export default function Header({ isLogin, totalItems }: HeaderProps) {
  return (
    <nav className="flex z-50 justify-between items-center bg-transparent px-3 py-2">
      <Link href={"/"} className="flex items-center gap-1 ">
        <IoLogoChrome className="text-2xl" />
        <span className="font-bold text-2xl ">Hương Quê</span>
      </Link>
      <NavMenu />
      <div className="flex gap-4">
        <Link href="/search" className="p-2 rounded-full hover:bg-gray-100">
          <IoSearch className="text-xl" />
        </Link>
        <Link
          href="/cart"
          className="p-2 rounded-full hover:bg-gray-100 relative"
        >
          <FiShoppingCart className="text-xl" />
          {totalItems > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
              {totalItems > 99 ? "99+" : totalItems}
            </div>
          )}
        </Link>
        {isLogin ? (
          <Link href="/settings" className="p-2 rounded-full hover:bg-gray-100">
            <FaRegUser className="text-xl" />
          </Link>
        ) : (
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}
