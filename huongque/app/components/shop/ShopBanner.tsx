'use client'

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { ShopBannerProps } from "@/app/models/Shop.model"

export default function ShopBanner({ title, description, imageSrc, ctaText, ctaLink }: ShopBannerProps) {
  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      <Image 
        src={imageSrc} 
        alt={title} 
        width={1920} 
        height={400}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-lg">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">{title}</h1>
            <p className="mt-4 text-xl text-white/80">
              {description}
            </p>
            <div className="mt-8">
              <a 
                href={ctaLink} 
                className="inline-flex items-center rounded-md border border-transparent bg-white px-6 py-3 text-base font-medium text-gray-900 shadow-sm hover:bg-gray-100"
              >
                {ctaText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
