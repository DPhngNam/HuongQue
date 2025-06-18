'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Package, Truck, CheckCircle2, Clock, LucideIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { orders, formatCurrency, getStatusInfo } from '@/app/utils/orderData';

export default function Orderhistory() {
  const router = useRouter();

  const handleViewDetails = (orderId: string) => {
    router.push(`/settings/orderdetail?orderId=${orderId}`);
  };

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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Lịch sử mua hàng</h2>
      
      <div className="space-y-4">
        {orders.map((order) => {
          const statusInfo = getStatusInfo(order.status);
          const Icon = getIconComponent(statusInfo.icon);

          return (
            <div key={order.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium">Đơn hàng #{order.id}</h3>
                  <p className="text-sm text-gray-500">Đặt ngày: {order.date}</p>
                </div>
                <div className={`flex items-center gap-2 ${statusInfo.color}`}>
                  <Icon size={18} />
                  <span>{statusInfo.text}</span>
                </div>
              </div>

              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                      <p className="text-sm text-gray-500">Giá: {formatCurrency(item.price)}</p>
                    </div>
                  </div>
                ))}

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Tổng tiền:</p>
                      <p className="font-medium">{formatCurrency(order.totalAmount)}</p>
                    </div>
                    <div className="space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDetails(order.id)}
                      >
                        Chi tiết
                      </Button>
                      {order.status === 'delivered' ? (
                        <Button variant="outline" size="sm">
                          Mua lại
                        </Button>
                      ) : order.status === 'shipping' ? (
                        <Button variant="outline" size="sm">
                          Theo dõi
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
