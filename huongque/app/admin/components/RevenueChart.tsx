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
    <div className="bg-white rounded-xl shadow p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Biểu đồ doanh thu</h2>
        <p className="text-sm text-gray-500">
          Theo dõi doanh thu  theo thời gian
        </p>
      </div>

      <div className="flex gap-4 mb-2">
        <button
          className={`px-4 py-1 rounded ${
            tab === "day"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => setTab("day")}
        >
          Theo ngày
        </button>
        <button
          className={`px-4 py-1 rounded ${
            tab === "month"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => setTab("month")}
        >
          Theo tháng
        </button>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={tab === "day" ? dailyData : monthlyData}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis tickFormatter={(val) => `${(val / 1000).toFixed(0)}N`} />
          <Tooltip formatter={(val: number) => `${val.toLocaleString()} đ`} />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#3b82f6"
            fill="url(#colorRevenue)"
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
