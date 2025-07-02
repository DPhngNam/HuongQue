'use client'

import React from "react";
import { FileText, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import TabHeader from "../TabHeader";

export default function ReportsTab({ onTabChange }: { onTabChange?: (tabId: string) => void }) {
  return (
    <div className="space-y-6">
      <TabHeader 
        title="Báo cáo & Phản hồi" 
        description="Quản lý báo cáo và phản hồi từ người dùng" 
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-xl border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 text-sm font-medium">Báo cáo mới</p>
              <p className="text-2xl font-bold text-red-900">23</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-xl border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-600 text-sm font-medium">Đang xử lý</p>
              <p className="text-2xl font-bold text-yellow-900">45</p>
            </div>
            <FileText className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Đã giải quyết</p>
              <p className="text-2xl font-bold text-green-900">189</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Tỷ lệ hài lòng</p>
              <p className="text-2xl font-bold text-blue-900">94%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Content placeholder */}
      <div className="bg-gray-50 rounded-xl p-12 text-center">
        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Quản lý báo cáo</h3>
        <p className="text-gray-600 mb-6">Tính năng quản lý báo cáo và phản hồi sẽ được triển khai sớm</p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Xem chi tiết
        </button>
      </div>
    </div>
  );
}
