'use client'

import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  iconBg: string;
  change: string;
  changeType: "up" | "down";
  changeText: string;
  changeColor: string;
  bgGradient: string;
}

export default function StatsCard({
  title,
  value,
  icon,
  iconBg,
  change,
  changeType,
  changeText,
  changeColor,
  bgGradient,
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-gray-200 group">
      <div className="flex items-center justify-between mb-4">
        <div className={`${bgGradient} rounded-xl p-3 group-hover:scale-110 transition-transform duration-300`}>
          <div className={`${iconBg} rounded-lg p-2 text-white shadow-lg`}>
            {icon}
          </div>
        </div>
        <div
          className={`flex items-center gap-1 text-sm font-semibold ${changeColor} bg-opacity-10 px-2 py-1 rounded-full`}
        >
          <span className="text-lg">
            {changeType === "up" ? "↗️" : "↘️"}
          </span>
          <span>{change}</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
          {title}
        </h3>
        <p className="text-3xl font-bold text-gray-900">
          {value}
        </p>
        <p className={`text-sm ${changeColor}`}>
          {changeText}
        </p>
      </div>
    </div>
  );
}
