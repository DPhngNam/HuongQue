"use client";

import { usePathname } from "next/navigation";
import AuthInit from "./AuthInit";
import Header from "./Header";
import Footer from "./Footer";
import { useAuthStore } from "@/app/stores/authStore";
import { useCartStore } from "@/app/stores/cartStore";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const noHeader = ["/login", "/sign-up", "/forgot-password", "/admin"];
  const showHeaderFooter = !noHeader.includes(pathname);
  const isLogin = useAuthStore((state) => state.isLogin());
  const totalItems = useCartStore((state) => state.totalItems);

  return (
    <>
      <AuthInit />
      {showHeaderFooter && <Header isLogin={isLogin} totalItems={totalItems} />}
      {children}
      {showHeaderFooter && <Footer />}
    </>
  );
}
