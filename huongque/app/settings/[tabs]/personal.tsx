'use client';

import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Camera } from 'lucide-react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
export default function Personal() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthday: '',
  })

  useEffect(() => {

    // Simulate fetching user data from an API
    const fetchUserData = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        console.error("No access token found");
        return;
      }
      const decoded = jwtDecode(accessToken);
      const email = decoded.sub;

      const userData = await axios.get('http://localhost:8080/userservice/users/' + email)
        .then(response => response.data)
        .catch(error => {
          console.log("Error fetching user data:", error);
        });

      console.log("User data fetched:", userData);
      setUser(userData);
    }
    fetchUserData();
  }, []);
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Thông tin cá nhân</h2>

      {/* Avatar Section */}
      <div className="mb-8">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
              {/* <img
                src="/placeholder-avatar.jpg"
                alt="Avatar"
                className="w-full h-full object-cover"
              /> */}
              <Image
                src="/image/avatar.jpg"
                alt="Avatar"
                width={96}
                height={96}
                className="rounded-full border-2 border-gray-200 object-cover"
              />

            </div>
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-50"
            >
              <Camera size={18} className="text-gray-600" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
              />
            </label>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Ảnh đại diện</h3>
            <p className="text-sm text-gray-500">
              JPG, GIF hoặc PNG. Kích thước tối đa 2MB
            </p>
          </div>
        </div>
      </div>

      <form className="space-y-6 max-w-2xl">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">Họ</Label>
            <Input id="firstName" placeholder="Nhập họ của bạn" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Tên</Label>
            <Input id="lastName" placeholder="Nhập tên của bạn" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Nhập email của bạn" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Số điện thoại</Label>
          <Input id="phone" type="tel" placeholder="Nhập số điện thoại của bạn" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthday">Ngày sinh</Label>
          <Input id="birthday" type="date" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Giới tính</Label>
          <select id="gender" className="w-full p-2 border rounded-md">
            <option value="">Chọn giới tính</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
        </div>

        <Button type="submit" className="w-full md:w-auto">
          Lưu thay đổi
        </Button>
      </form>
    </div>
  );
}
