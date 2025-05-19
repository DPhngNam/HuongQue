'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Package, Truck, CheckCircle2, Clock } from 'lucide-react';

export default function Orderhistory() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Lịch sử mua hàng</h2>
      
      <div className="space-y-4">
        {/* Sample Order Card */}
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-medium">Đơn hàng #12345</h3>
              <p className="text-sm text-gray-500">Đặt ngày: 20/03/2024</p>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle2 size={18} />
              <span>Đã giao</span>
            </div>
          </div>

          <div className="space-y-4">
            {/* Order Item */}
            <div className="flex gap-4">
              <img 
                src="/placeholder-product.jpg" 
                alt="Product" 
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="flex-1">
                <h4 className="font-medium">Tên sản phẩm</h4>
                <p className="text-sm text-gray-500">Số lượng: 2</p>
                <p className="text-sm text-gray-500">Giá: 500.000đ</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Tổng tiền:</p>
                  <p className="font-medium">1.000.000đ</p>
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">
                    Chi tiết
                  </Button>
                  <Button variant="outline" size="sm">
                    Mua lại
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Another Order Card */}
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-medium">Đơn hàng #12344</h3>
              <p className="text-sm text-gray-500">Đặt ngày: 19/03/2024</p>
            </div>
            <div className="flex items-center gap-2 text-blue-600">
              <Truck size={18} />
              <span>Đang giao</span>
            </div>
          </div>

          <div className="space-y-4">
            {/* Order Item */}
            <div className="flex gap-4">
              <img 
                src="/placeholder-product.jpg" 
                alt="Product" 
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="flex-1">
                <h4 className="font-medium">Tên sản phẩm</h4>
                <p className="text-sm text-gray-500">Số lượng: 1</p>
                <p className="text-sm text-gray-500">Giá: 300.000đ</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Tổng tiền:</p>
                  <p className="font-medium">300.000đ</p>
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">
                    Chi tiết
                  </Button>
                  <Button variant="outline" size="sm">
                    Theo dõi
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
