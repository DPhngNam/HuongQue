import { SidebarProvider } from "@/components/ui/sidebar";
import React, { ReactNode } from "react";
import { AppSidebar } from "./appsidebar";


export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <SidebarProvider className="w-full h-full flex justify-center items-center">
        <AppSidebar />
        <main className="w-full">{children}</main>
      </SidebarProvider>
    </div>
  );
}