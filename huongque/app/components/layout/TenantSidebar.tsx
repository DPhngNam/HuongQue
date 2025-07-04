"use client";

import {
  LayoutDashboard,
  BarChart2,
  Truck,
  PackageSearch,
  Settings,
  Home,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function TenantSidebar() {
  const { tenantId } = useParams();
  const items = [
    {
      title: "Bảng điều khiển",
      url: `/tenant/${tenantId}`,
      icon: LayoutDashboard,
    },

    {
      title: "Sản phẩm",
      url: `/tenant/${tenantId}/product`,
      icon: PackageSearch,
    },
    {
      title: "Đơn hàng",
      url: "#",
      icon: Truck,
    },
    {
      title: "Cài đặt",
      url: "#",
      icon: Settings,
    },
  ];
  return (
    <Sidebar variant="floating" className="flex flex-col py-10 h-full">
      <SidebarContent className="flex-1">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl font-bold text-black">
            Quản lý cửa hàng
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mt-auto">
        <SidebarMenuButton asChild>
          <Link href={"/"}>
            <Home />
            <span>Quay về trang chủ</span>
          </Link>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
