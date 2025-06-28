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
import { Label } from "@radix-ui/react-label";
import { useRouter, useSearchParams } from "next/navigation";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

import axiosInstance from "@/lib/axiosInstance";
import React, { FormEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "../stores/authStore";

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const { setTokens } = useAuthStore();

  React.useEffect(() => {
    if (status === "success") {
      toast.success("Xác thực thành công! Bạn có thể đăng nhập ngay bây giờ.");
    } else if (status === "already") {
      toast.info("Tài khoản đã xác nhận trước đó. Bạn có thể đăng nhập.");
    } else if (status === "expired") {
      toast.error("Link xác nhận đã hết hạn. Vui lòng đăng ký lại.");
    }
  }, [status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const url = process.env.NEXT_PUBLIC_AUTH_API;
    try {
      const response = await axiosInstance.post(`${url}/auth/login`, {
        email,
        password,
      });

      const { accessToken, refreshToken } = response.data;
      console.log("Đăng nhập thành công:", response.data);

      // Lưu token
      setTokens(accessToken, refreshToken);

      toast.success("Đăng nhập thành công");

      router.push("/");
    } catch (error: any) {
      let errorMsg = "Lỗi không xác định";
      if (error.response && error.response.data) {
        errorMsg =
          error.response.data.message || JSON.stringify(error.response.data);
      } else if (error.message) {
        errorMsg = error.message;
      }
      toast.error("Đăng nhập thất bại: " + errorMsg);
    }
  }

  return (
    <div className="flex justify-center items-center flex-col px-4 py-12 min-h-screen bg-white">
      <ToastContainer position="top-center" autoClose={3000} />
      {/* Form đăng nhập */}
      <div className="w-full max-w-md text-center text-gray-900 text-3xl md:text-4xl font-bold font-['Montserrat'] leading-tight md:leading-[56px] mb-4">
        Đăng nhập tài khoản
      </div>
      <Card className="w-full max-w-md md:w-[564px] mt-4 md:mt-8">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">
            Chào mừng trở lại
          </CardTitle>
          <CardDescription className="text-sm md:text-base">
            Đăng nhập bằng email và mật khẩu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="grid w-full items-center gap-4"
          >
            <div className="grid w-full items-center gap-4">
              <div className="grid w-full items-center gap-2 md:gap-4">
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
                  className="border border-gray-300 rounded-2xl md:rounded-4xl p-2"
                />
              </div>
              <div className="grid w-full items-center gap-2 md:gap-4">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Mật khẩu
                </Label>
                <div className="relative">
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="border border-gray-300 rounded-2xl md:rounded-4xl p-2 w-full"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="grid w-full items-center gap-4">
                <Button
                  type="submit"
                  className="w-full bg-green-500 text-white rounded-2xl md:rounded-4xl p-2 hover:bg-green-600 text-base md:text-lg"
                >
                  Đăng nhập
                </Button>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-2">
                <Link href={"/forgot-password"}>
                  <Label
                    htmlFor="forgot-password"
                    className="peer text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    Quên mật khẩu?
                  </Label>
                </Link>
                {/* Thêm link đăng ký */}
                <Link href={"/sign-up"}>
                  <Label className="peer text-sm font-medium text-green-600 cursor-pointer">
                    Đăng ký
                  </Label>
                </Link>
              </div>
            </div>
          </form>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border mt-2 md:mt-4">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Hoặc tiếp tục với
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-4">
            {/*Google */}
            <Button
              onClick={() => {
                window.location.href =
                  "http://localhost:8080/authservice/oauth2/authorization/google";
              }}
              variant="outline"
              className="w-full"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-5 w-5 mr-2"
              >
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              <span className="sr-only">Đăng nhập với Google</span>
              Đăng nhập với Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
