"use client";

import { usePathname } from "next/navigation";
import AuthInit from "./AuthInit";
import Header from "./Header";
import Footer from "./Footer";


export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const noHeader = ["/login", "/sign-up", "/forgot-password","/admin"];
  const showHeaderFooter = !noHeader.includes(pathname);

  return (
    <>
      <AuthInit />
      {showHeaderFooter && <Header />}
      {children}
      {showHeaderFooter && <Footer />}
    </>
  );
}
