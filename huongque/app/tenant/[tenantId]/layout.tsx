import Header from "@/app/components/layout/Header";
import TenantSidebar from "@/app/components/layout/TenantSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const TenantLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
    <SidebarProvider>
      <div className="flex p-10">
        <TenantSidebar />
        <main className="w-full">{children}</main>
      </div>
    </SidebarProvider>
    </>
  );
};

export default TenantLayout;
