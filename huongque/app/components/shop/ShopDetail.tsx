'use client'

import { ShopInfoProps } from "./ShopAvatar";
import { Globe, Mail, Phone, MapPin, User, Building, Calendar, CheckCircle } from "lucide-react";

interface ShopDetailProps {
  shopInfo: ShopInfoProps;
}

export default function ShopDetail({ shopInfo }: ShopDetailProps) {
  // Parse organization info HTML to extract key information
  const parseOrganizationInfo = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    const info: { [key: string]: string } = {};
    const rows = doc.querySelectorAll('.row');
    
    rows.forEach(row => {
      const cols = row.querySelectorAll('div[class*="col-"]');
      if (cols.length >= 2) {
        const key = cols[0].textContent?.trim();
        const value = cols[1].textContent?.trim();
        if (key && value) {
          info[key] = value;
        }
      }
    });
    
    return info;
  };

  const organizationInfo = parseOrganizationInfo(shopInfo.organization_info);

  return (
    <div className="bg-white w-full">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shop Description */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Giới thiệu cửa hàng</h2>
            <div 
              className="prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: shopInfo.ShopDescription || "Thông tin mô tả cửa hàng sẽ được cập nhật sớm." 
              }}
            />
          </div>

          {/* Organization Info */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Thông tin cơ sở</h3>
            
            <div className="space-y-4">
              {organizationInfo["Tên cơ sở"] && (
                <div className="flex items-start gap-3">
                  <Building className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Tên cơ sở</p>
                    <p className="text-sm text-gray-600">{organizationInfo["Tên cơ sở"]}</p>
                  </div>
                </div>
              )}

              {organizationInfo["Địa chỉ"] && (
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Địa chỉ chi tiết</p>
                    <p className="text-sm text-gray-600">{organizationInfo["Địa chỉ"]}</p>
                  </div>
                </div>
              )}

              {organizationInfo["Điện thoại"] && (
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Điện thoại</p>
                    <a href={`tel:${organizationInfo["Điện thoại"]}`} className="text-sm text-blue-600 hover:underline">
                      {organizationInfo["Điện thoại"]}
                    </a>
                  </div>
                </div>
              )}

              {organizationInfo["Email"] && (
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Email</p>
                    <a href={`mailto:${organizationInfo["Email"]}`} className="text-sm text-blue-600 hover:underline">
                      {organizationInfo["Email"]}
                    </a>
                  </div>
                </div>
              )}

              {organizationInfo["Website"] && (
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Website</p>
                    <a href={organizationInfo["Website"]} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                      {organizationInfo["Website"]}
                    </a>
                  </div>
                </div>
              )}

              {organizationInfo["Người đại diện"] && (
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Người đại diện</p>
                    <p className="text-sm text-gray-600">{organizationInfo["Người đại diện"]}</p>
                  </div>
                </div>
              )}

              {organizationInfo["Trạng thái"] && (
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Trạng thái</p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {organizationInfo["Trạng thái"]}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
