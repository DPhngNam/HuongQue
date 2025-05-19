'use client';

import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from 'lucide-react';

export default function Password() {
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Đổi mật khẩu</h2>
      <form className="space-y-6 max-w-2xl">
        <div className="space-y-2">
          <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
          <div className="relative">
            <Input 
              id="currentPassword" 
              type={showCurrentPassword ? "text" : "password"} 
              placeholder="Nhập mật khẩu hiện tại"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="newPassword">Mật khẩu mới</Label>
          <div className="relative">
            <Input 
              id="newPassword" 
              type={showNewPassword ? "text" : "password"} 
              placeholder="Nhập mật khẩu mới"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <p className="text-sm text-gray-500">
            Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
          <div className="relative">
            <Input 
              id="confirmPassword" 
              type={showConfirmPassword ? "text" : "password"} 
              placeholder="Nhập lại mật khẩu mới"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="pt-4">
          <Button type="submit" className="w-full md:w-auto">
            Cập nhật mật khẩu
          </Button>
        </div>
      </form>
    </div>
  );
}
