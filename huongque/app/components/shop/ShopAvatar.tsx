'use client'

import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";

export interface ShopInfoProps {
  id: string;
  name: string;
  avatar: string;
  address: string;
  phone: string;
  description: string;
  owner: string;
  organization_info: string;
  created_at: string;
  updated_at: string;
}

export default function ShopAvatar({ tenantId }: { tenantId: string }) {
  const [shopInfo, setShopInfo] = useState<ShopInfoProps | null>(null);

  useEffect(() => {
    const fetchShopInfo = async () => {
      try {
        const res = await axiosInstance.get(`/tenantservice/tenant/${tenantId}`);
        setShopInfo(res.data);
      } catch (error) {
        console.error("Error fetching shop info:", error);
      }
    };

    fetchShopInfo();
  }, [tenantId]);

  return (
    <div className="bg-white mt-10 border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        
        {/* Avatar */}
        <div className="relative w-20 h-20 rounded-full ring-2 ring-blue-500 overflow-hidden flex-shrink-0 shadow-sm">
          <Image
            src={shopInfo?.avatar || "/image/shop-placeholder.jpg"}
            alt={shopInfo?.name || "Shop Avatar"}
            fill
            className="object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{shopInfo?.name}</h3>
              {shopInfo?.description && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{shopInfo.description}</p>
              )}
              <div className="mt-3 space-y-1 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-500" />
                  <a href={`tel:${shopInfo?.phone}`} className="hover:underline text-blue-700">
                    {shopInfo?.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  <span>{shopInfo?.address}</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Link
              href={`/shop/${tenantId}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium whitespace-nowrap"
            >
              Xem cửa hàng
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
