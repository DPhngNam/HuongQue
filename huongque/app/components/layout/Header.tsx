import React from "react";
import { CiMenuBurger } from "react-icons/ci";
import { IoLogoChrome } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";

export default function Header() {
  return (
    <nav className="flex justify-between items-center bg-transparent px-3 py-2">
      <div className="flex items-center gap-1 ">
        <IoLogoChrome className="text-2xl" />
        <span className="font-bold text-2xl "> Huong Que</span>
      </div>
      <button>
        <CiMenuBurger className="text-2xl" />
      </button>
      <div className="flex justify-between gap-2" >
        <button className="text-2xl">
          <IoSearch />
        </button>
        <button className="text-2xl">
          <FiShoppingCart />
        </button>
        <button className="text-2xl">
          <FaRegUser />
        </button>
      </div>
    </nav>
  );
}
