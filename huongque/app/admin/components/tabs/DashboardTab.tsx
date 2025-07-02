'use client'

import React from "react";
import { Store, Users, ShoppingCart, TrendingUp, DollarSign, Package, Calendar, Activity, BarChart3 } from "lucide-react";
import RevenueChart from "../RevenueChart";
import StatsCard from "../StatsCard";
import QuickAction from "../QuickAction";
import TabHeader from "../TabHeader";

const statsData = [
  {
    title: "Tổng cửa hàng",
    value: "2,847",
    icon: <Store className="w-6 h-6" />,
    iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
    change: "+12%",
    changeType: "up" as const,
    changeText: "so với tháng trước",
    changeColor: "text-emerald-600",
    bgGradient: "bg-gradient-to-br from-blue-50 to-blue-100",
  },
  {
    title: "Người dùng hoạt động",
    value: "89,342",
    icon: <Users className="w-6 h-6" />,
    iconBg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    change: "+18%",
    changeType: "up" as const,
    changeText: "so với tháng trước",
    changeColor: "text-emerald-600",
    bgGradient: "bg-gradient-to-br from-emerald-50 to-emerald-100",
  },
  {
    title: "Đơn hàng hôm nay",
    value: "1,523",
    icon: <ShoppingCart className="w-6 h-6" />,
    iconBg: "bg-gradient-to-br from-orange-500 to-orange-600",
    change: "-3%",
    changeType: "down" as const,
    changeText: "so với hôm qua",
    changeColor: "text-red-500",
    bgGradient: "bg-gradient-to-br from-orange-50 to-orange-100",
  },
  {
    title: "Doanh thu hôm nay",
    value: "₫12,345,000",
    icon: <DollarSign className="w-6 h-6" />,
    iconBg: "bg-gradient-to-br from-purple-500 to-purple-600",
    change: "+5%",
    changeType: "up" as const,
    changeText: "so với hôm qua",
    changeColor: "text-emerald-600",
    bgGradient: "bg-gradient-to-br from-purple-50 to-purple-100",
  }
];

export default function DashboardTab({ onTabChange }: { onTabChange?: (tabId: string) => void }) {
  const quickActions = [
    {
      title: "Thêm cửa hàng mới",
      icon: <Store className="w-4 h-4" />,
      onClick: () => onTabChange?.("shops"),
      bgColor: "bg-blue-50 hover:bg-blue-100",
      iconBg: "bg-blue-500",
    },
    {
      title: "Quản lý người dùng",
      icon: <Users className="w-4 h-4" />,
      onClick: () => onTabChange?.("users"),
      bgColor: "bg-green-50 hover:bg-green-100",
      iconBg: "bg-green-500",
    },
    {
      title: "Xem báo cáo",
      icon: <BarChart3 className="w-4 h-4" />,
      onClick: () => onTabChange?.("reports"),
      bgColor: "bg-purple-50 hover:bg-purple-100",
      iconBg: "bg-purple-500",
    },
  ];

  const quickStats = [
    {
      title: "Sản phẩm",
      value: "15,847",
      icon: <Package className="w-5 h-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Đơn hàng tuần này",
      value: "8,392",
      icon: <Calendar className="w-5 h-5" />,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Tỷ lệ chuyển đổi",
      value: "3.2%",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Thời gian phản hồi",
      value: "1.2s",
      icon: <Activity className="w-5 h-5" />,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <TabHeader 
        title="Tổng quan hệ thống" 
        description="Thống kê tổng quan về hoạt động của marketplace" 
      />

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, idx) => (
          <StatsCard key={idx} {...stat} />
        ))}
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.bgColor} ${stat.color} p-2 rounded-lg`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Thao tác nhanh
            </h3>
            <div className="space-y-3">
              {quickActions.map((action, idx) => (
                <QuickAction key={idx} {...action} />
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" />
              Hoạt động gần đây
            </h3>
            <div className="space-y-4">
              {[
                { action: "Đơn hàng mới #12345", time: "2 phút trước", color: "bg-blue-500", status: "Mới" },
                { action: "Cửa hàng \"ABC Store\" đăng ký", time: "15 phút trước", color: "bg-green-500", status: "Hoàn thành" },
                { action: "Thanh toán ₫2,500,000", time: "1 giờ trước", color: "bg-purple-500", status: "Thành công" },
                { action: "Sản phẩm mới được thêm", time: "2 giờ trước", color: "bg-orange-500", status: "Đã duyệt" },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${activity.color}`}></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    activity.status === "Mới" ? "bg-blue-100 text-blue-700" :
                    activity.status === "Hoàn thành" ? "bg-green-100 text-green-700" :
                    activity.status === "Thành công" ? "bg-purple-100 text-purple-700" :
                    "bg-orange-100 text-orange-700"
                  }`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
