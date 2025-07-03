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
import Link from "next/link";
import { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import * as yup from "yup";

const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  password: yup
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .required("Vui lòng nhập mật khẩu"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp")
    .required("Vui lòng xác nhận mật khẩu"),
});

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const email = formValues.email;
    const password = formValues.password;
    const confirmPassword = formValues.confirmPassword;
    const url = process.env.NEXT_PUBLIC_AUTH_API;

    try {
      await signUpSchema.validate(
        { email, password, confirmPassword },
        { abortEarly: false }
      );
      setErrors({});
      setError(null);
      const res = await axiosInstance.post(`/authservice/auth/register`, {
        email,
        password,
        confirmPassword,
      });
      console.log("Đăng ký thành công:", res);
      if (res && res.status === 201) {
        setTimeout(() => {
          toast.success("Vui lòng kiểm tra email để xác nhận tài khoản");
        }, 100);
      }
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data?.message || "Đăng ký thất bại");
      } else if (err.inner && err.inner.length > 0) {
        const fieldErrors: { [key: string]: string } = {};
        err.inner.forEach((e: any) => {
          if (e.path && !fieldErrors[e.path]) fieldErrors[e.path] = e.message;
        });
        setErrors(fieldErrors);
        setError(null);
      } else {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-10 w-10 text-green-500 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <div className="text-gray-900 text-2xl font-bold">Đang xử lý...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center flex-col px-4 py-12 min-h-screen bg-white">
      <ToastContainer position="top-center" autoClose={3000} />
      {/* Form đăng ký */}
      <div className="w-full max-w-md text-center text-gray-900 text-3xl md:text-4xl font-bold font-['Montserrat'] leading-tight md:leading-[56px] mb-4">
        Tạo tài khoản mới
      </div>
      <Card className="w-full max-w-md md:w-[564px] mt-4 md:mt-8">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">Đăng ký</CardTitle>
          <CardDescription className="text-sm md:text-base">
            Đăng ký tài khoản bằng email và mật khẩu
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
                  value={formValues.email}
                  onChange={(e) =>
                    setFormValues((v) => ({ ...v, email: e.target.value }))
                  }
                  className="border border-gray-300 rounded-2xl md:rounded-4xl p-2"
                />
                {errors.email && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </div>
                )}
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
                    value={formValues.password}
                    onChange={(e) =>
                      setFormValues((v) => ({ ...v, password: e.target.value }))
                    }
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.403-3.22 1.125-4.575M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.password}
                  </div>
                )}
              </div>
              <div className="grid w-full items-center gap-2 md:gap-4">
                <Label
                  htmlFor="confirm-password"
                  className="text-sm font-medium text-gray-700"
                >
                  Xác nhận mật khẩu
                </Label>
                <div className="relative">
                  <Input
                    name="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirm-password"
                    value={formValues.confirmPassword}
                    onChange={(e) =>
                      setFormValues((v) => ({
                        ...v,
                        confirmPassword: e.target.value,
                      }))
                    }
                    className="border border-gray-300 rounded-2xl md:rounded-4xl p-2 w-full"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.403-3.22 1.125-4.575M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
              {error && (
                <div className="text-red-500 text-sm font-medium">{error}</div>
              )}
              <div className="grid w-full items-center gap-4">
                <Button
                  disabled={isLoading}
                  type="submit"
                  className="w-full bg-green-500 text-white rounded-2xl md:rounded-4xl p-2 hover:bg-green-600 text-base md:text-lg"
                >
                  Đăng ký
                </Button>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-between gap-2">
                <p className="text-sm text-gray-500">Đã có tài khoản?</p>
                <Link href="/login" className="text-sm ml-3 text-[#00CC96]">
                  Đăng nhập
                </Link>
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border mt-2 md:mt-4">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Hoặc tiếp tục với
                </span>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <Button
                  onClick={() => {
                    window.location.href =
                      "http://localhost:8080/authservice/oauth2/authorization/google";
                  }}
                  variant="outline"
                  className="w-full"
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
                  <span className="sr-only">Đăng ký với Google</span>
                  Đăng ký với Google
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
