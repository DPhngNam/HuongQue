"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Personal from './[tabs]/personal';
import Password from './[tabs]/password';
import Orderhistory from './[tabs]/orderhistory';
import Address from './[tabs]/Address';
import Wishlist from './[tabs]/Wishlist';
import NotificationTab from './[tabs]/Notification';
import Review from './[tabs]/Review';
import { User , Lock,MapPin,Bell,Truck,Heart,LogOut,Star,MessageSquare, UserPlus} from 'lucide-react';
import { useAuthStore } from "../stores/authStore";
import Registration from "./[tabs]/Registration";
export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('personal');
  const {clearTokens} = useAuthStore();


  return (
    <div className="p-8 md:p-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-[300px] h-[440px] rounded-2xl bg-white shadow-[0px_2px_5px_-1px_rgba(107,114,128,0.03),0px_4px_10px_0px_rgba(107,114,128,0.04),0px_1px_22px_0px_rgba(107,114,128,0.08)] sticky top-4">
          <nav className="flex flex-col gap-2 p-4">
            <Button
              variant={activeSection === 'personal' ? 'default' : 'outline'}
              onClick={() => setActiveSection('personal')}
              className="w-[261px] h-[45px] px-6 py-3 flex items-center justify-start gap-4 border-0"
            >
              <User/> Thông tin cá nhân
            </Button>
            <Button
              variant={activeSection === 'password' ? 'default' : 'outline'}
              onClick={() => setActiveSection('password')}
              className="w-[261px] h-[45px] px-6 py-3 flex items-center justify-start gap-4 border-0"
            >
              <Lock /> Mật khẩu
            </Button>
            <Button
              variant={activeSection === 'orders' ? 'default' : 'outline'}
              onClick={() => setActiveSection('orders')}
              className="w-[261px] h-[45px] px-6 py-3 flex items-center justify-start gap-4 border-0"
            >
              <Truck /> Lịch sử mua hàng
            </Button>
            <Button
              variant={activeSection === 'address' ? 'default' : 'outline'}
              onClick={() => setActiveSection('address')}
              className="w-[261px] h-[45px] px-6 py-3 flex items-center justify-start gap-4 border-0"
            >
              <MapPin /> Địa chỉ
            </Button>
            <Button
              variant={activeSection === 'notification' ? 'default' : 'outline'}
              onClick={() => setActiveSection('notification')}
              className="w-[261px] h-[45px] px-6 py-3 flex items-center justify-start gap-4 border-0"
            >
              <Bell /> Thông báo
            </Button>
            <Button
              variant={activeSection === 'wishlist' ? 'default' : 'outline'}
              onClick={() => setActiveSection('wishlist')}
              className="w-[261px] h-[45px] px-6 py-3 flex items-center justify-start gap-4 border-0"
            >
              <Heart /> Yêu thích
            </Button>
            <Button
              variant={activeSection === 'registration' ? 'default' : 'outline'}
              onClick={() => setActiveSection('registration')}
              className="w-[261px] h-[45px] px-6 py-3 flex items-center justify-start gap-4 border-0"
            >
              <UserPlus /> Đăng ký tài khoản bán hàng
            </Button>
            <Button
              variant={activeSection === 'logout' ? 'default' : 'outline'}
              onClick={() => clearTokens()}
              className="w-[261px] h-[45px] px-6 py-3 flex items-center justify-start gap-4 border-0"
            >
              <LogOut /> Đăng xuất
            </Button>
          </nav>
        </div>
        <div className="w-full md:w-3/4 rounded-2xl bg-white shadow-[0px_2px_5px_-1px_rgba(107,114,128,0.03),0px_4px_10px_0px_rgba(107,114,128,0.04),0px_1px_22px_0px_rgba(107,114,128,0.08)]">
          {activeSection === 'personal' && (
            <Personal />
          )}
          {activeSection === 'password' && (
            <Password />
          )}
          {activeSection === 'orders' && (
            <Orderhistory />
          )}
          {activeSection === 'review' && (
            <Review />
          )}
          {activeSection === 'address' && (
            <Address />
          )}
          {activeSection === 'notification' && (
            <NotificationTab />
          )}
          {activeSection === 'wishlist' && (
            <Wishlist />
          )}
          {activeSection === 'registration' && (
            <Registration />
          )}
        </div>
      </div>
    </div>
  );
}
