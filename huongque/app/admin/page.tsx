import React from "react";
import { Store, Users, ShoppingCart } from "lucide-react";
import Container from "../components/container";
import RevenueChart from "./components/RevenueChart";

const statsData = [
  {
    title: "Tổng shop",
    value: "2,847",
    icon: <Store className="w-7 h-7" />,
    iconBg: "bg-blue-50 text-blue-500",
    change: "+12%",
    changeType: "up",
    changeText: "so với tháng trước",
    changeColor: "text-green-600",
  },
  {
    title: "Người dùng",
    value: "89,342",
    icon: <Users className="w-7 h-7" />,
    iconBg: "bg-green-50 text-green-500",
    change: "+18%",
    changeType: "up",
    changeText: "so với tháng trước",
    changeColor: "text-green-600",
  },
  {
    title: "Đơn hàng hôm nay",
    value: "1,523",
    icon: <ShoppingCart className="w-7 h-7" />,
    iconBg: "bg-orange-50 text-orange-500",
    change: "-3%",
    changeType: "down",
    changeText: "so với hôm qua",
    changeColor: "text-red-500",
  },
  {
    title: "Doanh thu hôm nay",
    value: "$12,345",
    icon: <ShoppingCart className="w-7 h-7" />,
    iconBg: "bg-purple-50 text-purple-500",
    change: "+5%",
    changeType: "up",
    changeText: "so với hôm qua",
    changeColor: "text-green-600",
  }
];

export default function page() {
  return (
    <div className="grid grid-cols-4 gap-4 w-full min-h-screen px-5 bg-[#f9fafb] ">
      {statsData.map((stat, idx) => (
        <Container key={idx}>
          <div className="flex flex-col gap-2 h-full justify-between">
            <div className="flex w-full justify-between items-center">
              <span className="text-gray-500 text-base font-medium">
                {stat.title}
              </span>
              <span className={`${stat.iconBg} rounded-lg p-2`}>
                {stat.icon}
              </span>
            </div>
            <div className="text-4xl font-extrabold text-gray-900 mt-2">
              {stat.value}
            </div>
            <div
              className={`flex items-center gap-1 text-base font-medium ${stat.changeColor}`}
            >
              <span>
                {stat.changeType === "up" ? "↗" : "↘"} {stat.change}
              </span>
              <span className={`text-sm ${stat.changeColor}`}>
                {stat.changeText}
              </span>
            </div>
          </div>
        </Container>
      ))}

      <div className="col-span-4">
        <RevenueChart />
      </div>
  
    </div>
  );
}
