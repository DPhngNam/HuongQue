'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Package, Truck, CheckCircle2, Clock, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function OrderDetail() {
  const router = useRouter();

  return (
    <div className="p-6">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại
        </Button>
        <h2 className="text-2xl font-semibold">Chi tiết đơn hàng #12345</h2>
      </div>

      <div className="space-y-6">
        {/* Order Status */}
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">Trạng thái đơn hàng</h3>
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle2 size={18} />
            <span>Đã giao</span>
          </div>
        </div>

        {/* Order Information */}
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">Thông tin đơn hàng</h3>
          <div className="space-y-2">
            <p><span className="text-gray-500">Mã đơn hàng:</span> #12345</p>
            <p><span className="text-gray-500">Ngày đặt:</span> 20/03/2024</p>
            <p><span className="text-gray-500">Phương thức thanh toán:</span> Chuyển khoản</p>
            <p><span className="text-gray-500">Trạng thái thanh toán:</span> Đã thanh toán</p>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">Thông tin giao hàng</h3>
          <div className="space-y-2">
            <p><span className="text-gray-500">Người nhận:</span> Nguyễn Văn A</p>
            <p><span className="text-gray-500">Số điện thoại:</span> 0123456789</p>
            <p><span className="text-gray-500">Địa chỉ:</span> 123 Đường ABC, Quận XYZ, TP. HCM</p>
          </div>
        </div>

        {/* Order Items */}
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">Sản phẩm đã đặt</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <img 
                src="/placeholder-product.jpg" 
                alt="Product" 
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="flex-1">
                <h4 className="font-medium">Tên sản phẩm</h4>
                <p className="text-sm text-gray-500">Số lượng: 2</p>
                <p className="text-sm text-gray-500">Giá: 500.000đ</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">Tổng kết đơn hàng</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Tạm tính:</span>
              <span>1.000.000đ</span>
            </div>
            <div className="flex justify-between">
              <span>Phí vận chuyển:</span>
              <span>30.000đ</span>
            </div>
            <div className="flex justify-between font-medium border-t pt-2 mt-2">
              <span>Tổng cộng:</span>
              <span>1.030.000đ</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline">
            Tải hóa đơn
          </Button>
          <Button>
            Mua lại
          </Button>
        </div>
      </div>
    </div>
  );
} 