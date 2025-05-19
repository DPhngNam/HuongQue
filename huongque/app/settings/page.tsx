"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SettingsPage() {
  // Mock user data
  const [user, setUser] = useState({
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0123456789",
    avatar: "https://i.pravatar.cc/150?img=3",
  });
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });
  const [avatar, setAvatar] = useState(user.avatar);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setAvatar(url);
    }
  };

  const handleCancel = () => {
    setForm({ name: user.name, email: user.email, phone: user.phone });
    setAvatar(user.avatar);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setUser({ ...user, ...form, avatar });
      setLoading(false);
      // Show success toast here if needed
    }, 1200);
  };

  return (
    <div className="container mx-auto px-4 py-10 flex flex-col items-center min-h-[80vh]">
      {/* Hero section */}
      <div className="flex flex-col items-center mb-9 w-full">
        <div className="relative group">
          <Avatar className="w-32 h-32 mb-2 shadow-lg border-4 border-white bg-gray-100">
            <AvatarImage src={avatar} alt={form.name} />
            <AvatarFallback className="text-3xl">
              {form.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <label className="absolute bottom-2 right-2 bg-white rounded-full p-2 border shadow cursor-pointer group-hover:bg-gray-100 transition flex items-center">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
            <span className="text-xs text-gray-600 font-medium">Đổi</span>
          </label>
        </div>
        <div className="text-2xl font-bold mt-3 text-gray-800">{form.name}</div>
        <div className="text-gray-500 text-base mt-1">{form.email}</div>
      </div>
      {/* Form section */}
      <Card className="w-full max-w-2xl shadow-xl">
        <CardContent className="py-8 px-8">
          <form className="space-y-7" onSubmit={handleSave}>
            <div>
              <Label htmlFor="name" className="text-base font-semibold">
                Họ và tên
              </Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="h-12 text-lg mt-2"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-base font-semibold">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="h-12 text-lg mt-2"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-base font-semibold">
                Số điện thoại
              </Label>
              <Input
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="h-12 text-lg mt-2"
              />
            </div>
            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={loading}
                className="px-8 h-12 text-base"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="px-8 h-12 text-base font-semibold"
              >
                {loading ? "Đang lưu..." : "Lưu thay đổi"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
