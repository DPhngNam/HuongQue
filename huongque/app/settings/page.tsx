"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Personal from "./[tabs]/personal";
import Password from "./[tabs]/password";
import Orderhistory from "./[tabs]/orderhistory";
import Address from "./[tabs]/Address";
import Wishlist from "./[tabs]/Wishlist";
import NotificationTab from "./[tabs]/Notification";
import Review from "./[tabs]/Review";
import {
  User,
  Lock,
  MapPin,
  Bell,
  Truck,
  Heart,
  LogOut,
  Star,
  MessageSquare,
  UserPlus,
  Box,
} from "lucide-react";
import { useAuthStore } from "../stores/authStore";
import Registration from "./[tabs]/Registration";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";

import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { getAllClaimsFromToken, getRolesFromToken } from "@/lib/jwtUtils";
import { bool } from "yup";
import Link from "next/link";
import axiosInstance from "@/lib/axiosInstance";
export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("personal");
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { accessToken, clearTokens } = useAuthStore();
  const router = useRouter();

  const claims = getAllClaimsFromToken(accessToken ?? "");
  const isTenant = claims?.roles.includes("TENANT") || false;

  const [tenantId, setTenantId] = useState();

  useEffect(() => {
    const fetchTenant = async () => {
      if (claims?.sub) {
        try {
          const response = await axiosInstance.get(
            `/tenantservice/tenant/owner/${claims?.sub}`
          );
          setTenantId(response.data);
        } catch (error) {
          console.error("Error fetching tenant:", error);
        }
      }
    };

    fetchTenant();
  }, [claims?.sub]);

  const handleSignOut = () => {
    clearTokens();
    setShowLogoutDialog(false);
    router.push("/");
  };

  return (
    <div className="p-8 md:p-8">
      <ToastContainer />
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bạn có chắc chắn muốn đăng xuất?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowLogoutDialog(false)}
            >
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleSignOut}>
              Đăng xuất
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-[300px] h-[440px] rounded-2xl bg-white shadow-[0px_2px_5px_-1px_rgba(107,114,128,0.03),0px_4px_10px_0px_rgba(107,114,128,0.04),0px_1px_22px_0px_rgba(107,114,128,0.08)] sticky top-4">
          <nav className="flex flex-col gap-2 p-4">
            <Button
              variant={activeSection === "personal" ? "default" : "outline"}
              onClick={() => setActiveSection("personal")}
              className="w-[261px] h-[45px] px-6 py-3 flex items-center justify-start gap-4 border-0"
            >
              <User /> Thông tin cá nhân
            </Button>
            <Button
              variant={activeSection === "password" ? "default" : "outline"}
              onClick={() => setActiveSection("password")}
              className="w-[261px] h-[45px] px-6 py-3 flex items-center justify-start gap-4 border-0"
            >
              <Lock /> Mật khẩu
            </Button>
            <Button
              variant={activeSection === "orders" ? "default" : "outline"}
              onClick={() => setActiveSection("orders")}
              className="w-[261px] h-[45px] px-6 py-3 flex items-center justify-start gap-4 border-0"
            >
              <Truck /> Lịch sử mua hàng
            </Button>
            <Button
              variant={activeSection === "address" ? "default" : "outline"}
              onClick={() => setActiveSection("address")}
              className="w-[261px] h-[45px] px-6 py-3 flex items-center justify-start gap-4 border-0"
            >
              <MapPin /> Địa chỉ
            </Button>
            <Button
              variant={activeSection === "notification" ? "default" : "outline"}
              onClick={() => setActiveSection("notification")}
              className="w-[261px] h-[45px] px-6 py-3 flex items-center justify-start gap-4 border-0"
            >
              <Bell /> Thông báo
            </Button>
            <Button
              variant={activeSection === "wishlist" ? "default" : "outline"}
              onClick={() => setActiveSection("wishlist")}
              className="w-[261px] h-[45px] px-6 py-3 flex items-center justify-start gap-4 border-0"
            >
              <Heart /> Yêu thích
            </Button>

            {isTenant && (
              <Link href={`/tenant/${tenantId}`}>
                <Button
                  variant={activeSection === "product" ? "default" : "outline"}
                  className="w-[261px] h-[45px] px-6 py-3 flex items-center justify-start gap-4 border-0"
                >
                  <Box /> Quản lý sản phẩm
                </Button>
              </Link>
            )}

            {!isTenant && (
              <Button
                variant={activeSection === "review" ? "default" : "outline"}
                onClick={() => setActiveSection("review")}
                className="w-[261px] h-[45px] px-6 py-3 flex items-center justify-start gap-4 border-0"
              >
                <Star /> Đánh giá
              </Button>
            )}
            {!isTenant && (
              <Button
                variant={
                  activeSection === "registration" ? "default" : "outline"
                }
                onClick={() => setActiveSection("registration")}
                className="w-[261px] h-[45px] px-6 py-3 flex items-center justify-start gap-4 border-0"
              >
                <UserPlus /> Đăng ký tài khoản bán hàng
              </Button>
            )}

            <Button
              variant={activeSection === "logout" ? "default" : "outline"}
              onClick={() => setShowLogoutDialog(true)}
              className="w-[261px] h-[45px] px-6 py-3 flex items-center justify-start gap-4 border-0"
            >
              <LogOut /> Đăng xuất
            </Button>
          </nav>
        </div>
        <div className="w-full md:w-3/4 rounded-2xl bg-white shadow-[0px_2px_5px_-1px_rgba(107,114,128,0.03),0px_4px_10px_0px_rgba(107,114,128,0.04),0px_1px_22px_0px_rgba(107,114,128,0.08)]">
          {activeSection === "personal" && <Personal />}
          {activeSection === "password" && <Password />}
          {activeSection === "orders" && <Orderhistory />}
          {activeSection === "review" && <Review />}
          {activeSection === "address" && <Address />}
          {activeSection === "notification" && <NotificationTab />}
          {activeSection === "wishlist" && <Wishlist />}
          {activeSection === "registration" && <Registration />}
        </div>
      </div>
    </div>
  );
}
