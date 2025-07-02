'use client'

import React, { useState } from "react";
import { Store, Plus, Search, Filter, Eye, Edit, Trash2, Star, MapPin, Phone } from "lucide-react";
import TabHeader from "../TabHeader";

const shopData = [
  {
    id: 1,
    name: "ABC Electronics Store",
    owner: "Nguyễn Văn A",
    status: "active",
    rating: 4.8,
    products: 245,
    orders: 1532,
    revenue: "₫15,430,000",
    location: "Hà Nội",
    phone: "0987654321",
    joinDate: "2024-01-15",
    avatar: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=center"
  },
  {
    id: 2,
    name: "Fashion Style Boutique",
    owner: "Trần Thị B",
    status: "active",
    rating: 4.6,
    products: 189,
    orders: 892,
    revenue: "₫8,920,000",
    location: "TP.HCM",
    phone: "0912345678",
    joinDate: "2024-02-20",
    avatar: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=64&h=64&fit=crop&crop=center"
  },
  {
    id: 3,
    name: "Green Organic Foods",
    owner: "Lê Văn C",
    status: "pending",
    rating: 4.9,
    products: 67,
    orders: 234,
    revenue: "₫3,240,000",
    location: "Đà Nẵng",
    phone: "0923456789",
    joinDate: "2024-03-10",
    avatar: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=64&h=64&fit=crop&crop=center"
  },
  {
    id: 4,
    name: "Tech Gadgets Hub",
    owner: "Phạm Thị D",
    status: "suspended",
    rating: 4.2,
    products: 312,
    orders: 1890,
    revenue: "₫22,150,000",
    location: "Hà Nội",
    phone: "0934567890",
    joinDate: "2023-12-05",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=center"
  },
];

export default function ShopManagementTab({ onTabChange }: { onTabChange?: (tabId: string) => void }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredShops = shopData.filter(shop => {
    const matchesSearch = shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shop.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || shop.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      active: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      suspended: "bg-red-100 text-red-700",
    };
    const statusText = {
      active: "Hoạt động",
      pending: "Chờ duyệt",
      suspended: "Tạm dừng",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles]}`}>
        {statusText[status as keyof typeof statusText]}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <TabHeader 
        title="Quản lý cửa hàng" 
        description="Quản lý toàn bộ cửa hàng trên marketplace"
        action={
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            Thêm cửa hàng
          </button>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Tổng cửa hàng</p>
              <p className="text-2xl font-bold text-blue-900">2,847</p>
            </div>
            <Store className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Đang hoạt động</p>
              <p className="text-2xl font-bold text-green-900">2,543</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-xl border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-600 text-sm font-medium">Chờ duyệt</p>
              <p className="text-2xl font-bold text-yellow-900">156</p>
            </div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-xl border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 text-sm font-medium">Tạm dừng</p>
              <p className="text-2xl font-bold text-red-900">148</p>
            </div>
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm cửa hàng theo tên hoặc chủ sở hữu..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Hoạt động</option>
            <option value="pending">Chờ duyệt</option>
            <option value="suspended">Tạm dừng</option>
          </select>
        </div>
      </div>

      {/* Shops Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Cửa hàng</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Trạng thái</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Thống kê</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Doanh thu</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredShops.map((shop) => (
                <tr key={shop.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={shop.avatar}
                        alt={shop.name}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{shop.name}</h3>
                        <p className="text-sm text-gray-600">{shop.owner}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {shop.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {shop.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-2">
                      {getStatusBadge(shop.status)}
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{shop.rating}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1 text-sm">
                      <div className="text-gray-600">{shop.products} sản phẩm</div>
                      <div className="text-gray-600">{shop.orders} đơn hàng</div>
                      <div className="text-xs text-gray-500">Tham gia: {shop.joinDate}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-semibold text-green-600">{shop.revenue}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Hiển thị {filteredShops.length} trong tổng số {shopData.length} cửa hàng
        </p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Trước
          </button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded-lg">1</button>
          <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            2
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Sau
          </button>
        </div>
      </div>
    </div>
  );
}
