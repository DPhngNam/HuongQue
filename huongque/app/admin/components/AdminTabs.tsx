'use client'

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  BarChart2,
  Store,
  Users,
  FileText,
  Gift,
  Settings,
  Key,
  Shield,
  ClipboardList,
} from "lucide-react";

// Import individual tab content components
import DashboardTab from "./tabs/DashboardTab";
import ShopManagementTab from "./tabs/ShopManagementTab";
import UserManagementTab from "./tabs/UserManagementTab";
import ReportsTab from "./tabs/ReportsTab";
import PromotionsTab from "./tabs/PromotionsTab";
import SettingsTab from "./tabs/SettingsTab";
import AccessTab from "./tabs/AccessTab";
import IntegrationTab from "./tabs/IntegrationTab";
import RegistrationsTab from "./tabs/RegistrationsTab";

interface TabItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  component: React.ComponentType<{ onTabChange?: (tabId: string) => void }>;
}

const tabItems: TabItem[] = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: <BarChart2 className="w-4 h-4" />,
    component: DashboardTab,
  },
  {
    id: "shops",
    name: "Cửa hàng",
    icon: <Store className="w-4 h-4" />,
    component: ShopManagementTab,
  },
  {
    id: "users",
    name: "Người dùng",
    icon: <Users className="w-4 h-4" />,
    component: UserManagementTab,
  },
  {
    id: "registrations",
    name: "Đăng ký",
    icon: <ClipboardList className="w-4 h-4" />,
    component: RegistrationsTab,
  },
  {
    id: "reports",
    name: "Báo cáo",
    icon: <FileText className="w-4 h-4" />,
    component: ReportsTab,
  },
  {
    id: "promotions",
    name: "Khuyến mãi",
    icon: <Gift className="w-4 h-4" />,
    component: PromotionsTab,
  },
  {
    id: "settings",
    name: "Cài đặt",
    icon: <Settings className="w-4 h-4" />,
    component: SettingsTab,
  },
  {
    id: "access",
    name: "Quyền truy cập",
    icon: <Key className="w-4 h-4" />,
    component: AccessTab,
  },
  {
    id: "integration",
    name: "Tích hợp",
    icon: <Shield className="w-4 h-4" />,
    component: IntegrationTab,
  },
];

export default function AdminTabs() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Quản lý toàn bộ hệ thống marketplace
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tab Navigation */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
            <TabsList className="w-full h-auto p-2 bg-gray-50 flex-wrap justify-start gap-1">
              {tabItems.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 hover:bg-white/50 transition-all duration-200"
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[600px]">
            {tabItems.map((tab) => {
              const Component = tab.component;
              return (
                <TabsContent
                  key={tab.id}
                  value={tab.id}
                  className="p-6 focus:outline-none"
                >
                  <Component onTabChange={setActiveTab} />
                </TabsContent>
              );
            })}
          </div>
        </Tabs>
      </div>
    </div>
  );
}
