'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Package, Truck, CheckCircle2, Clock, ArrowLeft, LucideIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getOrderById, formatCurrency, getStatusInfo } from '@/app/utils/orderData';

export default function OrderDetail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const order = orderId ? getOrderById(orderId) : null;

  const getIconComponent = (iconName: string): LucideIcon => {
    const iconMap: Record<string, LucideIcon> = {
      CheckCircle2,
      Truck,
      Clock,
      X: Package,
      HelpCircle: Package
    };
    return iconMap[iconName] || Package;
  };

  if (!order) {
    return (
      <div className="p-6">
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại
        </Button>
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Không tìm thấy đơn hàng</h2>
          <p className="text-gray-500">Đơn hàng bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(order.status);
  const Icon = getIconComponent(statusInfo.icon);

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
        <h2 className="text-2xl font-semibold">Chi tiết đơn hàng #{order.id}</h2>
      </div>

      <div className="space-y-6">
        {/* Order Status */}
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">Trạng thái đơn hàng</h3>
          <div className={`flex items-center gap-2 ${statusInfo.color}`}>
            <Icon size={18} />
            <span>{statusInfo.text}</span>
          </div>
        </div>

        {/* Order Information */}
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">Thông tin đơn hàng</h3>
          <div className="space-y-2">
            <p><span className="text-gray-500">Mã đơn hàng:</span> #{order.id}</p>
            <p><span className="text-gray-500">Ngày đặt:</span> {order.date}</p>
            <p><span className="text-gray-500">Phương thức thanh toán:</span> {order.paymentMethod}</p>
            <p><span className="text-gray-500">Trạng thái thanh toán:</span> {order.paymentStatus}</p>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">Thông tin giao hàng</h3>
          <div className="space-y-2">
            <p><span className="text-gray-500">Người nhận:</span> {order.shippingInfo.recipientName}</p>
            <p><span className="text-gray-500">Số điện thoại:</span> {order.shippingInfo.phone}</p>
            <p><span className="text-gray-500">Địa chỉ:</span> {order.shippingInfo.address}</p>
          </div>
        </div>

        {/* Order Items */}
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">Sản phẩm đã đặt</h3>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                  <p className="text-sm text-gray-500">Giá: {formatCurrency(item.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">Tổng kết đơn hàng</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Tạm tính:</span>
              <span>{formatCurrency(order.totalAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span>Phí vận chuyển:</span>
              <span>{formatCurrency(order.shippingFee)}</span>
            </div>
            <div className="flex justify-between font-medium border-t pt-2 mt-2">
              <span>Tổng cộng:</span>
              <span>{formatCurrency(order.totalAmount + order.shippingFee)}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline">
            Tải hóa đơn
          </Button>
          {order.status === 'delivered' && (
            <Button>
              Mua lại
            </Button>
          )}
        </div>
      </div>
    </div>
  );
} 