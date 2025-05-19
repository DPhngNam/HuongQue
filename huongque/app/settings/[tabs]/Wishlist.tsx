'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';

export default function Wishlist() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Sản phẩm yêu thích</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Sample Wishlist Item */}
        <div className="border rounded-lg p-4">
          <div className="relative">
            <img 
              src="/placeholder-product.jpg" 
              alt="Product" 
              className="w-full h-48 object-cover rounded-md"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 bg-white/80 hover:bg-white"
            >
              <Trash2 size={18} />
            </Button>
          </div>
          
          <div className="mt-4 space-y-2">
            <h3 className="font-medium">Tên sản phẩm</h3>
            <p className="text-sm text-gray-500">Thương hiệu</p>
            <p className="font-medium text-lg">500.000đ</p>
            
            <div className="flex gap-2 mt-4">
              <Button className="flex-1 flex items-center justify-center gap-2">
                <ShoppingCart size={18} />
                Thêm vào giỏ
              </Button>
              <Button variant="outline" size="icon">
                <Heart size={18} className="text-red-500" />
              </Button>
            </div>
          </div>
        </div>

        {/* Another Wishlist Item */}
        <div className="border rounded-lg p-4">
          <div className="relative">
            <img 
              src="/placeholder-product.jpg" 
              alt="Product" 
              className="w-full h-48 object-cover rounded-md"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 bg-white/80 hover:bg-white"
            >
              <Trash2 size={18} />
            </Button>
          </div>
          
          <div className="mt-4 space-y-2">
            <h3 className="font-medium">Tên sản phẩm</h3>
            <p className="text-sm text-gray-500">Thương hiệu</p>
            <p className="font-medium text-lg">300.000đ</p>
            
            <div className="flex gap-2 mt-4">
              <Button className="flex-1 flex items-center justify-center gap-2">
                <ShoppingCart size={18} />
                Thêm vào giỏ
              </Button>
              <Button variant="outline" size="icon">
                <Heart size={18} className="text-red-500" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
