import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  User,
  MapPin,
  CreditCard,
  Package,
  Bell,
  Shield,
  Store,
  Link,
} from "lucide-react";
import NextLink from "next/link";

export function AppSidebar() {
  const items = [
    {
      title: "Thông tin tài khoản",
      icon: User,
      href: "/settings",
    },
    {
      title: "Địa chỉ giao hàng",
      icon: MapPin,
      href: "/settings/address",
    },
    {
      title: "Phương thức thanh toán",
      icon: CreditCard,
      href: "/settings/payment",
    },
    {
      title: "Đơn hàng của tôi",
      icon: Package,
      href: "/settings/orders",
    },
    {
      title: "Cài đặt thông báo",
      icon: Bell,
      href: "/settings/notifications",
    },
    {
      title: "Bảo mật",
      icon: Shield,
      href: "/settings/security",
    },
  ];
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarContent>
          <SidebarMenuButton asChild>
            <NextLink href="/tenant/1" passHref legacyBehavior>
              <a className="flex items-center gap-2">
                <Store />
                <span>Quản lý cửa hàng</span>
              </a>
            </NextLink>
          </SidebarMenuButton>
        </SidebarContent>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <NextLink href={item.href} passHref legacyBehavior>
                    <a className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      {item.title}
                    </a>
                  </NextLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
