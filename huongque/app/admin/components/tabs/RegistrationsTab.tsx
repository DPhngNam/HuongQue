'use client'

import React, { useState, useEffect } from "react";
import { FileText, Search, Filter, Eye, Check, X, Clock, Trash2, Building, Mail, Phone, MapPin, User, Calendar, Image } from "lucide-react";
import TabHeader from "../TabHeader";
import { registrationService, Registration } from "@/app/services/registrationService";

export default function RegistrationsTab() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);

  const limit = 10;

  useEffect(() => {
    fetchRegistrations();
  }, [currentPage]);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const response = await registrationService.getRegistrations(currentPage, limit);
      setRegistrations(response?.registrations || []);
      setTotalPages(response?.totalPages || 1);
    } catch (error) {
      console.error('Error fetching registrations:', error);
      setRegistrations([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      setUpdating(id);
      await registrationService.updateRegistrationStatus(id, status);
      await fetchRegistrations(); // Refresh the list
    } catch (error) {
      console.error('Error updating registration status:', error);
    } finally {
      setUpdating(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đơn đăng ký này không?')) {
      try {
        await registrationService.deleteRegistration(id);
        await fetchRegistrations(); // Refresh the list
      } catch (error) {
        console.error('Error deleting registration:', error);
      }
    }
  };

  const filteredRegistrations = (registrations || []).filter(registration => {
    const matchesSearch = registration.tenant_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         registration.tenant_email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || registration.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'approved': return <Check className="w-4 h-4" />;
      case 'rejected': return <X className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Chờ duyệt';
      case 'approved': return 'Đã duyệt';
      case 'rejected': return 'Từ chối';
      default: return 'Chờ duyệt';
    }
  };

  const openDetailModal = (registration: Registration) => {
    setSelectedRegistration(registration);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setSelectedRegistration(null);
    setIsDetailModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <TabHeader 
        title="Quản lý đăng ký"
        description="Xem và quản lý tất cả đơn đăng ký cửa hàng"
        
      />

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên cửa hàng hoặc email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ duyệt</option>
            <option value="approved">Đã duyệt</option>
            <option value="rejected">Từ chối</option>
          </select>
        </div>
      </div>

      {/* Registrations Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cửa hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Loại hình
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày đăng ký
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    Đang tải...
                  </td>
                </tr>
              ) : filteredRegistrations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    Không có đơn đăng ký nào
                  </td>
                </tr>
              ) : (
                filteredRegistrations.map((registration) => (
                  <tr key={registration.registration_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {registration.tenant_logo ? (
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={registration.tenant_logo}
                              alt={registration.tenant_name}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <Building className="w-5 h-5 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {registration.tenant_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {registration.tenant_email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {registration.business_model}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(registration.status)}`}>
                        {getStatusIcon(registration.status)}
                        {getStatusText(registration.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(registration.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openDetailModal(registration)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {registration.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(registration.registration_id, 'approved')}
                              disabled={updating === registration.registration_id}
                              className="text-green-600 hover:text-green-900 transition-colors disabled:opacity-50"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(registration.registration_id, 'rejected')}
                              disabled={updating === registration.registration_id}
                              className="text-red-600 hover:text-red-900 transition-colors disabled:opacity-50"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDelete(registration.registration_id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Trước
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sau
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Trang <span className="font-medium">{currentPage}</span> trên{' '}
                    <span className="font-medium">{totalPages}</span>
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Trước
                    </button>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Sau
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {isDetailModalOpen && selectedRegistration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Chi tiết đăng ký
                </h2>
                <button
                  onClick={closeDetailModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    Thông tin cơ bản
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Tên cửa hàng</label>
                      <p className="text-sm text-gray-900">{selectedRegistration.tenant_name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="text-sm text-gray-900">{selectedRegistration.tenant_email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                      <p className="text-sm text-gray-900">{selectedRegistration.tenant_sdt}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                      <p className="text-sm text-gray-900">{selectedRegistration.tenant_address}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Loại hình kinh doanh</label>
                      <p className="text-sm text-gray-900">{selectedRegistration.business_model}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                      <p className="text-sm text-gray-900">{selectedRegistration.tenant_description}</p>
                    </div>
                  </div>
                </div>

                {/* Status Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Trạng thái
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Trạng thái hiện tại</label>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(selectedRegistration.status)}`}>
                        {getStatusIcon(selectedRegistration.status)}
                        {getStatusText(selectedRegistration.status)}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Ngày tạo</label>
                      <p className="text-sm text-gray-900">{new Date(selectedRegistration.createdAt).toLocaleDateString('vi-VN')}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Cập nhật lần cuối</label>
                      <p className="text-sm text-gray-900">{new Date(selectedRegistration.updatedAt).toLocaleDateString('vi-VN')}</p>
                    </div>
                    {selectedRegistration.note && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Ghi chú</label>
                        <p className="text-sm text-gray-900">{selectedRegistration.note}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Images */}
                <div className="md:col-span-2 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Image className="w-5 h-5" />
                    Hình ảnh
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedRegistration.tenant_logo && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                        <img
                          src={selectedRegistration.tenant_logo}
                          alt="Logo"
                          className="w-full h-32 object-cover rounded-lg border border-gray-200"
                        />
                      </div>
                    )}
                    {selectedRegistration.tenant_banner && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Banner</label>
                        <img
                          src={selectedRegistration.tenant_banner}
                          alt="Banner"
                          className="w-full h-32 object-cover rounded-lg border border-gray-200"
                        />
                      </div>
                    )}
                    {selectedRegistration.cccd_image && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CCCD</label>
                        <img
                          src={selectedRegistration.cccd_image}
                          alt="CCCD"
                          className="w-full h-32 object-cover rounded-lg border border-gray-200"
                        />
                      </div>
                    )}
                    {selectedRegistration.business_license_image && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Giấy phép kinh doanh</label>
                        <img
                          src={selectedRegistration.business_license_image}
                          alt="Business License"
                          className="w-full h-32 object-cover rounded-lg border border-gray-200"
                        />
                      </div>
                    )}
                    {selectedRegistration.food_safety_certificate_image && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Giấy chứng nhận ATTP</label>
                        <img
                          src={selectedRegistration.food_safety_certificate_image}
                          alt="Food Safety Certificate"
                          className="w-full h-32 object-cover rounded-lg border border-gray-200"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 mt-6 pt-6 border-t border-gray-200">
                {selectedRegistration.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        handleStatusUpdate(selectedRegistration.registration_id, 'approved');
                        closeDetailModal();
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Duyệt
                    </button>
                    <button
                      onClick={() => {
                        handleStatusUpdate(selectedRegistration.registration_id, 'rejected');
                        closeDetailModal();
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Từ chối
                    </button>
                  </>
                )}
                <button
                  onClick={closeDetailModal}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
