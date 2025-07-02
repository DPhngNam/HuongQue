'use client'

import React from "react";
import { Gift, Percent, Calendar, Target } from "lucide-react";
import TabHeader from "../TabHeader";

export default function PromotionsTab({ onTabChange }: { onTabChange?: (tabId: string) => void }) {
  return (
    <div className="space-y-6">
      <TabHeader 
        title="Quản lý khuyến mãi" 
        description="Tạo và quản lý các chương trình khuyến mãi" 
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Chương trình hiện tại</p>
              <p className="text-2xl font-bold text-purple-900">12</p>
            </div>
            <Gift className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Mã giảm giá</p>
              <p className="text-2xl font-bold text-green-900">156</p>
            </div>
            <Percent className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Sự kiện tháng này</p>
              <p className="text-2xl font-bold text-blue-900">8</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-sm font-medium">Tỷ lệ chuyển đổi</p>
              <p className="text-2xl font-bold text-orange-900">15%</p>
            </div>
            <Target className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Content placeholder */}
      <div className="bg-gray-50 rounded-xl p-12 text-center">
        <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Quản lý khuyến mãi</h3>
        <p className="text-gray-600 mb-6">Tạo và quản lý các chương trình khuyến mãi, mã giảm giá</p>
        <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
          Tạo khuyến mãi mới
        </button>
      </div>
    </div>
  );
}
