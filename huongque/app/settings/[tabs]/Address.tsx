'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, MapPin, Edit, Trash2 } from 'lucide-react';

export default function Address() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Địa chỉ của tôi</h2>
        <Button className="flex items-center gap-2">
          <Plus size={20} /> Thêm địa chỉ mới
        </Button>
      </div>

      <div className="space-y-4">
        {/* Sample Address Card */}
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="text-gray-500" />
              <h3 className="font-medium">Địa chỉ nhà</h3>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Edit size={18} />
              </Button>
              <Button variant="ghost" size="icon">
                <Trash2 size={18} />
              </Button>
            </div>
          </div>
          <div className="space-y-1 text-gray-600">
            <p>Nguyễn Văn A</p>
            <p>0123456789</p>
            <p>123 Đường ABC, Phường XYZ, Quận 1, TP.HCM</p>
          </div>
        </div>

        {/* Add New Address Form */}
        <div className="border rounded-lg p-6 mt-6">
          <h3 className="text-lg font-medium mb-4">Thêm địa chỉ mới</h3>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Họ và tên</Label>
                <Input id="fullName" placeholder="Nhập họ và tên" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input id="phone" placeholder="Nhập số điện thoại" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Địa chỉ</Label>
              <Input id="address" placeholder="Nhập địa chỉ" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Tỉnh/Thành phố</Label>
                <select id="city" className="w-full p-2 border rounded-md">
                  <option value="">Chọn Tỉnh/Thành phố</option>
                  <option value="hcm">TP.HCM</option>
                  <option value="hn">Hà Nội</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="district">Quận/Huyện</Label>
                <select id="district" className="w-full p-2 border rounded-md">
                  <option value="">Chọn Quận/Huyện</option>
                  <option value="q1">Quận 1</option>
                  <option value="q2">Quận 2</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ward">Phường/Xã</Label>
                <select id="ward" className="w-full p-2 border rounded-md">
                  <option value="">Chọn Phường/Xã</option>
                  <option value="p1">Phường 1</option>
                  <option value="p2">Phường 2</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="addressType">Loại địa chỉ</Label>
              <select id="addressType" className="w-full p-2 border rounded-md">
                <option value="home">Nhà riêng</option>
                <option value="office">Văn phòng</option>
                <option value="other">Khác</option>
              </select>
            </div>

            <Button type="submit" className="w-full md:w-auto">
              Lưu địa chỉ
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
