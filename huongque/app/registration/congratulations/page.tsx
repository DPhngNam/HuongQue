"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Store, Sparkles, ArrowRight, Home, Settings, ShoppingBag } from "lucide-react";

export default function CongratulationsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shopName = searchParams.get("shopName");
  const registrationId = searchParams.get("id");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Mark this congratulations as shown in localStorage
    if (registrationId) {
      localStorage.setItem(`congratulations_shown_${registrationId}`, "true");
    }

    // Trigger animations
    setIsLoaded(true);
  }, [registrationId]);

  const handleGoToSettings = () => {
    router.push("/settings");
  };

  const handleGoHome = () => {
    router.push("/");
  };

  const handleGoToShopDashboard = () => {
    // Navigate to shop dashboard - replace with your actual shop dashboard route
    // router.push("/shop/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translateY(0);
          }
          40%, 43% {
            transform: translateY(-10px);
          }
          70% {
            transform: translateY(-5px);
          }
        }
        
        @keyframes sparkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out forwards;
        }
        
        .animate-bounce-custom {
          animation: bounce 2s infinite;
        }
        
        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }
        
        .delay-300 { animation-delay: 0.3s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-900 { animation-delay: 0.9s; }
        .delay-1200 { animation-delay: 1.2s; }
      `}</style>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-pink-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-40 w-28 h-28 bg-blue-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-36 h-36 bg-green-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className={`relative z-10 w-full max-w-2xl ${isLoaded ? 'animate-scaleIn' : 'opacity-0'}`}>
        <Card className="bg-white/90 backdrop-blur-lg shadow-2xl border-0 overflow-hidden">
          <CardContent className="p-0">
            {/* Header Section with Gradient */}
            <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-8 text-center text-white relative overflow-hidden">
              {/* Decorative sparkles */}
              <div className="absolute inset-0">
                <Sparkles className="absolute top-4 left-8 h-6 w-6 text-yellow-300 animate-sparkle" />
                <Sparkles className="absolute top-12 right-12 h-4 w-4 text-yellow-200 animate-sparkle delay-300" />
                <Sparkles className="absolute bottom-8 left-16 h-5 w-5 text-yellow-300 animate-sparkle delay-700" />
                <Sparkles className="absolute bottom-6 right-8 h-6 w-6 text-yellow-200 animate-sparkle delay-1000" />
              </div>

              <div className={`relative z-10 ${isLoaded ? 'animate-bounce-custom' : ''}`}>
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
              </div>

              <h1 className={`text-4xl font-bold mb-2 ${isLoaded ? 'animate-fadeInUp delay-300' : 'opacity-0'}`}>
                🎉 Chúc mừng!
              </h1>

              <p className={`text-xl text-green-100 ${isLoaded ? 'animate-fadeInUp delay-600' : 'opacity-0'}`}>
                Đăng ký cửa hàng thành công!
              </p>
            </div>

            {/* Content Section */}
            <div className="p-8">
              <div className={`text-center mb-8 ${isLoaded ? 'animate-fadeInUp delay-900' : 'opacity-0'}`}>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Store className="h-8 w-8 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-800">
                    {shopName || "Cửa hàng của bạn"}
                  </h2>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Cửa hàng của bạn đã được đăng ký thành công trên nền tảng <span className="font-bold text-blue-600">Hương Quê</span>!
                  </p>
                </div>

                {registrationId && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-600 mb-1">Mã đăng ký:</p>
                    <p className="font-mono text-lg font-semibold text-gray-800">{registrationId}</p>
                  </div>
                )}
              </div>

              {/* Next Steps */}
              {/* <div className={`mb-8 ${isLoaded ? 'animate-fadeInUp delay-1200' : 'opacity-0'}`}>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                  Bước tiếp theo:
                </h3>
                <div className="grid gap-4">
                  <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-md">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Chờ phê duyệt</h4>
                      <p className="text-gray-600 text-sm">Team Hương Quê sẽ xem xét đơn đăng ký của bạn trong vòng 1-3 ngày làm việc.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-md">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-green-600 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Nhận thông báo</h4>
                      <p className="text-gray-600 text-sm">Bạn sẽ nhận được email thông báo kết quả phê duyệt.</p>
                    </div>
                  </div>                    <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-md">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-purple-600 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Truy cập dashboard</h4>
                      <p className="text-gray-600 text-sm">Bây giờ bạn có thể truy cập dashboard cửa hàng để quản lý sản phẩm và đơn hàng!</p>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* Action Buttons */}
              <div className="flex flex-col gap-4">
                <Button
                  onClick={handleGoToShopDashboard}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <ShoppingBag className="h-6 w-6 mr-3" />
                  Truy cập Dashboard Cửa hàng
                  <ArrowRight className="h-6 w-6 ml-3" />
                </Button>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleGoToSettings}
                    variant="outline"
                    className="flex-1 border-2 border-blue-300 hover:border-blue-400 hover:bg-blue-50 py-3 text-lg font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <Settings className="h-5 w-5 mr-2" />
                    Xem trạng thái đăng ký
                  </Button>

                  <Button
                    onClick={handleGoHome}
                    variant="outline"
                    className="flex-1 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 py-3 text-lg font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <Home className="h-5 w-5 mr-2" />
                    Về trang chủ
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
