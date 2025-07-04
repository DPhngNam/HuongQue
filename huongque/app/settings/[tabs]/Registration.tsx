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
import { Calendar, Clock, Store, Plus, ShoppingBag } from "lucide-react";

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

  const token = useAuthStore((state) => state.accessToken);
  const decodedToken = token ? (jwtDecode<MyJwtPayload>(token) as MyJwtPayload) : null;
  const userEmail = decodedToken?.email;
  

  useEffect(() => {
    const fetchRegistrations = async () => {
      if (!userEmail) {
        setLoading(false);
        return;
      }
      try {
        const data = await getRegistrationsByUser(userEmail);
        console.log("Fetched registrations:", data);
        // Debug: Log each registration status
        data.forEach((reg: Registration, index: number) => {
          console.log(`Registration ${index}:`, {
            shopName: reg.shopName,
            status: reg.status,
            statusType: typeof reg.status,
            statusLength: reg.status?.length
          });
        });
        setRegistrations(data);
      } catch (error) {
        console.log("Failed to fetch registrations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [userEmail]);

  const getStatusBadge = (status: string) => {
    // Normalize the status to handle case and whitespace issues
    const normalizedStatus = status?.toLowerCase().trim();
    
    const statusConfig = {
      pending: { 
        label: "Đang chờ duyệt", 
        variant: "warning",
        className: "bg-yellow-100 text-yellow-800 border-yellow-200"
      },
      approved: { 
        label: "Đã duyệt", 
        variant: "success",
        className: "bg-green-100 text-green-800 border-green-200"
      },
      rejected: { 
        label: "Từ chối", 
        variant: "destructive",
        className: "bg-red-100 text-red-800 border-red-200"
      },
    };

    const config = statusConfig[normalizedStatus as keyof typeof statusConfig] || {
      label: status || "Không xác định",
      variant: "secondary",
      className: "bg-gray-100 text-gray-800 border-gray-200"
    };

    return (
      <Badge 
        variant={config.variant as any}
        className={`${config.className} font-medium px-3 py-1`}
      >
        {config.label}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <Store className="absolute inset-0 m-auto h-6 w-6 text-blue-600" />
        </div>
        <p className="mt-4 text-gray-600 font-medium">Đang tải thông tin đăng ký...</p>
      </div>
    );
  }

  if (registrations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300">
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
            <ShoppingBag className="h-10 w-10 text-blue-600" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
            <Plus className="h-4 w-4 text-white" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Chưa có cửa hàng nào</h3>
        <p className="text-gray-500 text-center mb-6 max-w-md">
          Bạn chưa có đơn đăng ký cửa hàng nào. Hãy đăng ký ngay để bắt đầu kinh doanh trên Hương Quê!
        </p>
        <Button 
          onClick={() => router.push("/registration")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          <Plus className="h-5 w-5 mr-2" />
          Đăng ký cửa hàng ngay
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 rounded-xl">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Store className="h-8 w-8 text-blue-600" />
            Lịch sử đăng ký cửa hàng
          </h2>
          <p className="text-gray-600">Quản lý và theo dõi trạng thái đăng ký cửa hàng của bạn</p>
        </div>
        <Button 
          onClick={() => router.push("/registration")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          <Plus className="h-5 w-5 mr-2" />
          Đăng ký mới
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-white/70 backdrop-blur-sm border-blue-200 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng đăng ký</p>
                <p className="text-2xl font-bold text-blue-600">{registrations.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Store className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/70 backdrop-blur-sm border-green-200 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Đã duyệt</p>
                <p className="text-2xl font-bold text-green-600">
                  {registrations.filter(r => r.status?.toLowerCase().trim() === 'approved').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/70 backdrop-blur-sm border-yellow-200 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Đang chờ</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {registrations.filter(r => r.status?.toLowerCase().trim() === 'pending').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Registration Cards */}
      <div className="grid gap-6">
        {registrations.map((registration, index) => (
          <Card key={registration.id || `registration-${index}`} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Store className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-white">
                      {registration.shopName}
                    </CardTitle>
                    <p className="text-blue-100 text-sm">ID: {registration.id}</p>
                  </div>
                </div>
                {getStatusBadge(registration.status)}
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Ngày đăng ký</p>
                    <p className="text-sm text-gray-600">
                      {format(new Date(registration.createdAt), "PPP", { locale: vi })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Clock className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Cập nhật lần cuối</p>
                    <p className="text-sm text-gray-600">
                      {format(new Date(registration.updatedAt), "PPP", { locale: vi })}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}