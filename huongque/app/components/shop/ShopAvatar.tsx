'use client'

import Image from "next/image"
import Link from "next/link"
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react"

interface ShopAvatarProps {
  shopName: string;
  shopImage: string;
  shopDescription: string;
  contactInfo: {
    email: string;
    phone: string;
    address: string;
    website?: string;
  };
}

export default function ShopAvatar({ 
  shopName, 
  shopImage, 
  shopDescription, 
  contactInfo 
}: ShopAvatarProps) {
  return (
    <div className="bg-white border rounded-lg p-6 mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={shopImage}
            alt={shopName}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{shopName}</h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{shopDescription}</p>
          
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-400" />
              <a href={`mailto:${contactInfo.email}`} className="text-blue-600 hover:underline">
                {contactInfo.email}
              </a>
            </div>
            
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-400" />
              <a href={`tel:${contactInfo.phone}`} className="text-blue-600 hover:underline">
                {contactInfo.phone}
              </a>
            </div>
            
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">{contactInfo.address}</span>
            </div>
            
            {contactInfo.website && (
              <div className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-gray-400" />
                <a 
                  href={contactInfo.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Visit Website
                </a>
              </div>
            )}
          </div>
        </div>
        
        <Link 
          href="/shop" 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Visit Shop
        </Link>
      </div>
    </div>
  )
}
