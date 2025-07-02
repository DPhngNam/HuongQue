'use client'

import React, { useState } from "react";
import { Users, Plus, Search, Filter, Eye, Edit, Trash2, Crown, ShoppingBag, MapPin, Shield, Mail, Calendar, Ban } from "lucide-react";
import TabHeader from "../TabHeader";

const userData = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    email: "nguyenvanan@email.com",
    role: "customer",
    status: "active",
    joinDate: "2024-01-15",
    lastLogin: "2024-07-01",
    orders: 15,
    spent: "₫2,450,000",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=center"
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    email: "tranthibinh@email.com",
    role: "shop_owner",
    status: "active",
    joinDate: "2024-02-20",
    lastLogin: "2024-07-02",
    orders: 0,
    spent: "₫0",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b3d8?w=64&h=64&fit=crop&crop=center"
  },
  {
    id: 3,
    name: "Lê Văn Cường",
    email: "levancuong@email.com",
    role: "admin",
    status: "active",
    joinDate: "2023-12-01",
    lastLogin: "2024-07-02",
    orders: 0,
    spent: "₫0",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=center"
  },
  {
    id: 4,
    name: "Phạm Thị Dung",
    email: "phamthidung@email.com",
    role: "customer",
    status: "suspended",
    joinDate: "2024-03-10",
    lastLogin: "2024-06-28",
    orders: 8,
    spent: "₫1,200,000",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=center"
  },
];

export default function UserManagementTab({ onTabChange }: { onTabChange?: (tabId: string) => void }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredUsers = userData.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadge = (role: string) => {
    const roleStyles = {
      admin: "bg-purple-100 text-purple-700",
      shop_owner: "bg-blue-100 text-blue-700",
      customer: "bg-gray-100 text-gray-700",
    };
    const roleText = {
      admin: "Quản trị viên",
      shop_owner: "Chủ cửa hàng",
      customer: "Khách hàng",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleStyles[role as keyof typeof roleStyles]}`}>
        {roleText[role as keyof typeof roleText]}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      active: "bg-green-100 text-green-700",
      suspended: "bg-red-100 text-red-700",
      pending: "bg-yellow-100 text-yellow-700",
    };
    const statusText = {
      active: "Hoạt động",
      suspended: "Tạm khóa",
      pending: "Chờ xác thực",
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
        title="Quản lý người dùng" 
        description="Quản lý tài khoản và quyền truy cập của người dùng"
        action={
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            Thêm người dùng
          </button>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Tổng người dùng</p>
              <p className="text-2xl font-bold text-blue-900">89,342</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Khách hàng</p>
              <p className="text-2xl font-bold text-green-900">85,234</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Chủ cửa hàng</p>
              <p className="text-2xl font-bold text-purple-900">3,892</p>
            </div>
            <Shield className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-sm font-medium">Quản trị viên</p>
              <p className="text-2xl font-bold text-orange-900">216</p>
            </div>
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc email..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="all">Tất cả vai trò</option>
            <option value="customer">Khách hàng</option>
            <option value="shop_owner">Chủ cửa hàng</option>
            <option value="admin">Quản trị viên</option>
          </select>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Hoạt động</option>
            <option value="suspended">Tạm khóa</option>
            <option value="pending">Chờ xác thực</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Người dùng</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Vai trò</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Trạng thái</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Hoạt động</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{user.name}</h3>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </p>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          <Calendar className="w-3 h-3" />
                          Tham gia: {user.joinDate}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="py-4 px-6">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1 text-sm">
                      <div className="text-gray-600">Đăng nhập cuối: {user.lastLogin}</div>
                      {user.role === 'customer' && (
                        <>
                          <div className="text-gray-600">{user.orders} đơn hàng</div>
                          <div className="text-green-600 font-medium">{user.spent}</div>
                        </>
                      )}
                    </div>
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
                        <Ban className="w-4 h-4" />
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
          Hiển thị {filteredUsers.length} trong tổng số {userData.length} người dùng
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
