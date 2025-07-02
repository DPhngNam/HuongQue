'use client'

import React from "react";
import { Shield, Webhook, Database, Cloud } from "lucide-react";
import TabHeader from "../TabHeader";

export default function IntegrationTab({ onTabChange }: { onTabChange?: (tabId: string) => void }) {
  return (
    <div className="space-y-6">
      <TabHeader 
        title="Tích hợp & Bảo mật" 
        description="Quản lý tích hợp bên thứ 3 và bảo mật hệ thống" 
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-6 rounded-xl border border-teal-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-teal-600 text-sm font-medium">API Endpoints</p>
              <p className="text-2xl font-bold text-teal-900">156</p>
            </div>
            <Webhook className="w-8 h-8 text-teal-600" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Tích hợp</p>
              <p className="text-2xl font-bold text-blue-900">12</p>
            </div>
            <Cloud className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Webhooks</p>
              <p className="text-2xl font-bold text-purple-900">34</p>
            </div>
            <Database className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Uptime</p>
              <p className="text-2xl font-bold text-green-900">99.9%</p>
            </div>
            <Shield className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Content placeholder */}
      <div className="bg-gray-50 rounded-xl p-12 text-center">
        <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Tích hợp & Bảo mật</h3>
        <p className="text-gray-600 mb-6">Quản lý API, webhooks và các tích hợp bên thứ 3</p>
        <button className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors">
          Quản lý tích hợp
        </button>
      </div>
    </div>
  );
}
