import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  BarChart2,
  Store,
  Users,
  FileText,
  Gift,
  Settings,
  Key,
  Shield,
} from "lucide-react";

export default function AdminSidebar() {
  const sidebarItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: <BarChart2 className="w-5 h-5 mr-2" />,
    },
    {
      name: "Shop Management",
      href: "/admin/shops",
      icon: <Store className="w-5 h-5 mr-2" />,
    },
    {
      name: "User Management",
      href: "/admin/users",
      icon: <Users className="w-5 h-5 mr-2" />,
    },
    {
      name: "Reports & Feedback",
      href: "/admin/reports",
      icon: <FileText className="w-5 h-5 mr-2" />,
    },
    {
      name: "Promotions",
      href: "/admin/promotions",
      icon: <Gift className="w-5 h-5 mr-2" />,
    },
    {
      name: "Content & Settings",
      href: "/admin/settings",
      icon: <Settings className="w-5 h-5 mr-2" />,
    },
    {
      name: "Access & Permission",
      href: "/admin/access",
      icon: <Key className="w-5 h-5 mr-2" />,
    },
    {
      name: "Integration & Security",
      href: "/admin/integration",
      icon: <Shield className="w-5 h-5 mr-2" />,
    },
  ];
  return (
    <Sidebar>
      <SidebarHeader>
        <span>Admin dashboard</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {sidebarItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center px-4 py-2 rounded hover:bg-gray-100 transition text-gray-700 font-medium"
            >
              {item.icon}
              {item.name}
            </a>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
