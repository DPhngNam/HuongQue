'use client';

import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Mail, MessageSquare, ShoppingBag, Tag } from 'lucide-react';

export default function NotificationTab() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Cài đặt thông báo</h2>
      
      <div className="space-y-6 max-w-2xl">
        {/* Email Notifications */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Mail size={20} />
            Thông báo qua email
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Đơn hàng mới</Label>
                <p className="text-sm text-gray-500">Nhận thông báo khi có đơn hàng mới</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Khuyến mãi</Label>
                <p className="text-sm text-gray-500">Nhận thông báo về các chương trình khuyến mãi</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Tin tức</Label>
                <p className="text-sm text-gray-500">Nhận thông báo về tin tức và cập nhật</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* Push Notifications */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Bell size={20} />
            Thông báo đẩy
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Trạng thái đơn hàng</Label>
                <p className="text-sm text-gray-500">Nhận thông báo về trạng thái đơn hàng</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Khuyến mãi đặc biệt</Label>
                <p className="text-sm text-gray-500">Nhận thông báo về các ưu đãi đặc biệt</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* SMS Notifications */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <MessageSquare size={20} />
            Thông báo SMS
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Xác nhận đơn hàng</Label>
                <p className="text-sm text-gray-500">Nhận SMS xác nhận khi đặt hàng thành công</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Vận chuyển</Label>
                <p className="text-sm text-gray-500">Nhận SMS thông báo về tình trạng vận chuyển</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
