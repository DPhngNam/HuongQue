'use client'

import Image from "next/image";
import { Phone, MapPin, Globe, Mail } from "lucide-react";
import { ShopInfoProps } from "./ShopAvatar";

interface ShopHeaderProps {
  shopInfo: ShopInfoProps;
}

export default function ShopHeader({ shopInfo }: ShopHeaderProps) {
  return (
    <div className="bg-white w-full border-b">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Shop Avatar */}
          <div className="flex-shrink-0">
            <Image
              src={shopInfo.avatar}
              alt={shopInfo.name}
              width={120}
              height={120}
              className="rounded-full object-cover border-4 border-gray-100"
            />
          </div>

          {/* Shop Info */}
          <div className="flex-grow">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {shopInfo.name}
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-4 text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span>{shopInfo.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-gray-400" />
                <span>{shopInfo.phone}</span>
              </div>
            </div>

            {/* Short Description */}
            <div className="text-gray-700 leading-relaxed">
              {shopInfo.ShopDescription ? (
                <div 
                  className="line-clamp-3 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: shopInfo.ShopDescription.replace(/<[^>]*>/g, ' ').substring(0, 200) + "..." 
                  }}
                />
              ) : (
                <p className="text-gray-600">Chào mừng bạn đến với cửa hàng của chúng tôi!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
