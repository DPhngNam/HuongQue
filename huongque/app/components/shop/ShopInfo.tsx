'use client'

import { ShopInfoProps } from "@/app/models/Shop.model"
import ShopFeature from "./ShopFeature"

export default function ShopInfo({ title, description, features }: ShopInfoProps) {
  return (
    <div className="bg-white w-full">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h2>
          <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {/* Shop Features */}
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
          {features.map((feature, index) => (
            <ShopFeature 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              bgColor={feature.bgColor}
              iconColor={feature.iconColor}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
