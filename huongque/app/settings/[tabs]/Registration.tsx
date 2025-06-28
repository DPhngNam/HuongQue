"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { getRegistrationsByUser } from "@/app/registration/service/regis.service";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useAuthStore } from "@/app/stores/authStore";
import { jwtDecode } from "jwt-decode";

interface Registration {
  id: string;
  shopName: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
}
export interface MyJwtPayload {
  email: string;
  [key: string]: any;
}

export default function Registration() {
  const router = useRouter();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    console.log("No access token found");
  }

  const decodedToken = jwtDecode<MyJwtPayload>(accessToken || "");
  const email = decodedToken.email;
  console.log("Decoded email:", email);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const data = await getRegistrationsByUser(email);
        setRegistrations(data);
      } catch (error) {
        console.log("Failed to fetch registrations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "Đang chờ duyệt", variant: "warning" },
      approved: { label: "Đã duyệt", variant: "success" },
      rejected: { label: "Từ chối", variant: "destructive" },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge variant={config.variant as any}>
        {config.label}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (registrations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <p className="text-gray-500 text-center">
          Bạn chưa có đơn đăng ký cửa hàng nào
        </p>
        <Button onClick={() => router.push("/registration")}>
          Đăng ký cửa hàng
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Lịch sử đăng ký cửa hàng</h2>
        <Button onClick={() => router.push("/registration")}>
          Đăng ký mới
        </Button>
      </div>

      <div className="grid gap-4">
        {registrations.map((registration) => (
          <Card key={registration.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">
                {registration.shopName}
              </CardTitle>
              {getStatusBadge(registration.status)}
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-500">
                <p>Ngày đăng ký: {format(new Date(registration.createdAt), "PPP", { locale: vi })}</p>
                <p>Cập nhật lần cuối: {format(new Date(registration.updatedAt), "PPP", { locale: vi })}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}