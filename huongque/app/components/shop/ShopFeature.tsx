'use client'

import { ShopFeatureProps } from "@/app/models/Shop.model"
import { Leaf, Package, Truck, ShoppingBag } from "lucide-react"

export default function ShopFeature({ icon, title, description, bgColor, iconColor }: ShopFeatureProps) {
  // Render the appropriate icon based on the string identifier
  const renderIcon = () => {
    switch (icon) {
      case "Leaf":
        return <Leaf className="h-12 w-12" />
      case "Package":
        return <Package className="h-12 w-12" />
      case "Truck":
        return <Truck className="h-12 w-12" />
      default:
        return <ShoppingBag className="h-12 w-12" />
    }
  }

  return (
    <div className="text-center">
      <div className={`mx-auto h-24 w-24 flex items-center justify-center rounded-full ${bgColor}`}>
        <div className={iconColor}>
          {renderIcon()}
        </div>
      </div>
      <h3 className="mt-6 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-base text-gray-500">
        {description}
      </p>
    </div>
  )
}
