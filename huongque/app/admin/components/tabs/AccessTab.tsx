'use client'

import React from "react";
import { Key, Users, Shield, Lock } from "lucide-react";
import TabHeader from "../TabHeader";

export default function AccessTab({ onTabChange }: { onTabChange?: (tabId: string) => void }) {
  return (
    <div className="space-y-6">
      <TabHeader 
        title="Quyền truy cập" 
        description="Quản lý quyền truy cập và phân quyền người dùng" 
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-6 rounded-xl border border-indigo-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-600 text-sm font-medium">Nhóm quyền</p>
              <p className="text-2xl font-bold text-indigo-900">8</p>
            </div>
            <Users className="w-8 h-8 text-indigo-600" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Quyền hệ thống</p>
              <p className="text-2xl font-bold text-green-900">45</p>
            </div>
            <Shield className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-xl border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-600 text-sm font-medium">API Keys</p>
              <p className="text-2xl font-bold text-yellow-900">23</p>
            </div>
            <Key className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-xl border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 text-sm font-medium">Bảo mật</p>
              <p className="text-2xl font-bold text-red-900">99%</p>
            </div>
            <Lock className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Content placeholder */}
      <div className="bg-gray-50 rounded-xl p-12 text-center">
        <Key className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Quản lý quyền truy cập</h3>
        <p className="text-gray-600 mb-6">Thiết lập và quản lý quyền truy cập cho các nhóm người dùng</p>
        <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          Quản lý quyền
        </button>
      </div>
    </div>
  );
}
