"use client";

import { usePathname } from "next/navigation";
import AuthInit from "./AuthInit";
import Header from "./Header";
import Footer from "./Footer";
import ChatBot from "../chatbot/ChatBot";
import { useAuthStore } from "@/app/stores/authStore";
import { useCartStore } from "@/app/stores/cartStore";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const noHeader = [
    "/login",
    "/sign-up",
    "/forgot-password",
    "/admin",
    "/tenant",
  ];
  const showHeaderFooter = !noHeader.some((path) => pathname.startsWith(path));
  const showChatBot = !pathname.startsWith("/admin"); // Show chatbot on all pages except admin

  return (
    <>
      <AuthInit />
      {showHeaderFooter && <Header />}
      {children}
      {showHeaderFooter && <Footer />}
      {showChatBot && <ChatBot />}
    </>
  );
}
