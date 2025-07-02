"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const dailyData = [
  { date: "T2", revenue: 1200 },
  { date: "T3", revenue: 3000 },
  { date: "T4", revenue: 5000 },
  { date: "T5", revenue: 3200 },
  { date: "T6", revenue: 6500 },
  { date: "T7", revenue: 8200 },
  { date: "CN", revenue: 7800 },
];

const monthlyData = [
  { date: "Tháng 1", revenue: 15000 },
  { date: "Tháng 2", revenue: 19000 },
  { date: "Tháng 3", revenue: 22000 },
  { date: "Tháng 4", revenue: 18500 },
];

import { useState } from "react";

export default function RevenueChart() {
  const [tab, setTab] = useState<"day" | "month">("day");

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Biểu đồ doanh thu</h2>
          <p className="text-sm text-gray-500 mt-1">
            Theo dõi doanh thu theo thời gian
          </p>
        </div>
        
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setTab("day")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              tab === "day"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Theo ngày
          </button>
          <button
            onClick={() => setTab("month")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              tab === "month"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Theo tháng
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={tab === "day" ? dailyData : monthlyData}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis 
            dataKey="date" 
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value/1000}K`}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                    <p className="text-sm font-medium text-gray-900">{label}</p>
                    <p className="text-sm text-blue-600">
                      Doanh thu: {payload[0].value?.toLocaleString('vi-VN')} VNĐ
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#3b82f6"
            strokeWidth={3}
            fill="url(#colorRevenue)"
            dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
