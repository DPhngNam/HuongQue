"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";
import Image from "next/image";
import axiosInstance from "@/lib/axiosInstance";
import { toast, ToastContainer } from "react-toastify";

export default function Personal() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    birthday: "",
    avatar: "/image/avatar.jpg", // default avatar
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        fullName: user.name,
        phone: user.phone,
        dob: user.birthday,
      };
      await axiosInstance.patch("/userservice/users/me", payload);
      toast.success("Cập nhật thông tin thành công!");
    } catch (error) {
      console.error("Error updating user profile:", error);
      toast.error("Có lỗi xảy ra khi cập nhật thông tin!");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get("/userservice/users/me");
        const data = res.data;
        setUser({
          name: data.name || data.fullName || "",
          email: data.email || data.gmail || "",
          phone: data.phone || "",
          birthday: data.birthday || data.dob || "",
          avatar: data.avatar || "/image/avatar.jpg",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Có lỗi khi tải thông tin người dùng!");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader">loading</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <ToastContainer />
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
                src={user.avatar || "/image/avatar.jpg"}
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
          {!user.avatar && (
            <div className="space-y-2">
              <h3 className="font-medium">Ảnh đại diện</h3>
              <p className="text-sm text-gray-500">
                JPG, GIF hoặc PNG. Kích thước tối đa 2MB
              </p>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="space-y-2">
          <Label htmlFor="fullName">Họ và tên</Label>
          <Input
            id="fullName"
            placeholder="Nhập họ và tên của bạn"
            value={user.name || ""}
            onChange={(e) => setUser({ ...user, name: e.target.value })} // Allow editing
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Nhập email của bạn"
            value={user.email || ""}
            onChange={(e) => setUser({ ...user, email: e.target.value })} // Allow editing
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Số điện thoại</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Nhập số điện thoại của bạn"
            value={user.phone || ""}
            onChange={(e) => setUser({ ...user, phone: e.target.value })} // Allow editing
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthday">Ngày sinh</Label>
          <Input
            id="birthday"
            type="date"
            value={user.birthday || ""}
            onChange={(e) => setUser({ ...user, birthday: e.target.value })} // Allow editing
          />
        </div>

        <Button
          type="submit"
          className="w-full md:w-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
        </Button>
      </form>
    </div>
  );
}
