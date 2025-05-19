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
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      {/* Hero section */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative group">
          <Avatar className="w-24 h-24 mb-2">
            <AvatarImage src={avatar} alt={form.name} />
            <AvatarFallback>{form.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <label className="absolute bottom-0 right-0 bg-white rounded-full p-1 border shadow cursor-pointer group-hover:bg-gray-100 transition">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
            <span className="text-xs text-gray-600">Đổi</span>
          </label>
        </div>
        <div className="text-xl font-semibold mt-2">{form.name}</div>
      </div>
      {/* Form section */}
      <Card className="w-full max-w-lg">
        <CardContent className="py-6">
          <form className="space-y-5" onSubmit={handleSave}>
            <div>
              <Label htmlFor="name">Họ và tên</Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={loading}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Đang lưu..." : "Lưu thay đổi"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
