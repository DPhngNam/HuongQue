'use client'

import Image from "next/image"
import Link from "next/link"
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react"
import { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "@/lib/axiosInstance";
import { se } from "date-fns/locale";


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


export default function ShopAvatar({tenantId}:{tenantId: string}){
  const [shopInfo, setShopInfo] = useState<ShopInfoProps | null>(null);

  useEffect(()=>{
    const fetchShopInfo = async ()=>{
      try{
        const res = await axiosInstance.get(`/tenantservice/tenant/${tenantId}`);
        setShopInfo(res.data);
      }catch(error){
        console.error("Error fetching shop info:", error);
      }
    }

    fetchShopInfo();
  }, [tenantId]);



  return (
    <div className="bg-white border rounded-lg p-6 mb-8">
 
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={shopInfo?.avatar || "/image/shop-placeholder.jpg"}
            alt={shopInfo?.name || "Shop Avatar"}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{shopInfo?.name}</h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{shopInfo?.description}</p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-400" />
              <a href={`tel:${shopInfo?.phone}`} className="text-blue-600 hover:underline">
                {shopInfo?.phone}
              </a>
            </div>
            
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">{shopInfo?.address}</span>
            </div>

            
          </div>
        </div>
        
        <Link 
          href="/shop" 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Xem cửa hàng
        </Link>
      </div>
    </div>
  )
}
