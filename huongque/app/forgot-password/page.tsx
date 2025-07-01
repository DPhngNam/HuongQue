"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/lib/axiosInstance";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const url = process.env.NEXT_PUBLIC_AUTH_API;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("URL", url);
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");

    if (!email) return;

    setLoading(true);
    try {
      const res = await axiosInstance.post(
        "/authservice/auth/forgot-password",
        {
          email,
        }
      );
      console.log("Response:", res.data);
      setLoading(false);
      toast.success(
        "Chúng tôi đã gửi liên kết đặt lại mật khẩu đến email của bạn."
      );
    } catch (error) {
      console.error("Error sending reset link:", error);
      setLoading(false);
      toast.error(
        "Đã xảy ra lỗi khi gửi liên kết đặt lại mật khẩu. Vui lòng thử lại sau."
      );
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <ToastContainer />
      <Card className="w-[564px] gap-4 h-[400px] justify-center p-9 ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Quên mật khẩu</CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Nhập địa chỉ email của bạn, chúng tôi sẽ gửi cho bạn một liên kết để
            đặt lại mật khẩu.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="grid w-full items-center gap-4"
          >
            <div className="grid w-full items-center gap-4">
              <div className="grid w-full items-center gap-4">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </Label>
                <Input
                  name="email"
                  type="email"
                  id="email"
                  required
                  className="border border-gray-300 rounded-4xl p-2"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="bg-[#00CC96] text-white rounded-4xl w-full h-[56px] mt-7"
              disabled={loading}
            >
              {loading ? "Đang gửi..." : "Gửi liên kết đặt lại mật khẩu"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
