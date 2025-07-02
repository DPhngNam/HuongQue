'use client'

import React from "react";
import { Settings, Database, Mail, Bell, Shield, Globe } from "lucide-react";
import TabHeader from "../TabHeader";

export default function SettingsTab({ onTabChange }: { onTabChange?: (tabId: string) => void }) {
  return (
    <div className="space-y-6">
      <TabHeader 
        title="Cài đặt hệ thống" 
        description="Cấu hình và quản lý các thiết lập hệ thống" 
      />

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Cơ sở dữ liệu</h3>
              <p className="text-sm text-gray-600">Quản lý backup và restore</p>
            </div>
          </div>
          <button className="w-full bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-colors">
            Cấu hình
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Mail className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Email</h3>
              <p className="text-sm text-gray-600">Cấu hình SMTP và template</p>
            </div>
          </div>
          <button className="w-full bg-green-50 text-green-600 py-2 rounded-lg hover:bg-green-100 transition-colors">
            Cấu hình
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Bell className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Thông báo</h3>
              <p className="text-sm text-gray-600">Cài đặt push notification</p>
            </div>
          </div>
          <button className="w-full bg-yellow-50 text-yellow-600 py-2 rounded-lg hover:bg-yellow-100 transition-colors">
            Cấu hình
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <Shield className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Bảo mật</h3>
              <p className="text-sm text-gray-600">Cài đặt bảo mật hệ thống</p>
            </div>
          </div>
          <button className="w-full bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition-colors">
            Cấu hình
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Globe className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Ngôn ngữ</h3>
              <p className="text-sm text-gray-600">Cài đặt đa ngôn ngữ</p>
            </div>
          </div>
          <button className="w-full bg-purple-50 text-purple-600 py-2 rounded-lg hover:bg-purple-100 transition-colors">
            Cấu hình
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gray-100 p-3 rounded-lg">
              <Settings className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Chung</h3>
              <p className="text-sm text-gray-600">Cài đặt chung hệ thống</p>
            </div>
          </div>
          <button className="w-full bg-gray-50 text-gray-600 py-2 rounded-lg hover:bg-gray-100 transition-colors">
            Cấu hình
          </button>
        </div>
      </div>

      {/* Content placeholder */}
      <div className="bg-gray-50 rounded-xl p-12 text-center">
        <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Cài đặt hệ thống</h3>
        <p className="text-gray-600 mb-6">Quản lý và cấu hình các thiết lập hệ thống marketplace</p>
      </div>
    </div>
  );
}
