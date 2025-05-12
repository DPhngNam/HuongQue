'use client'

import { products } from "@/app/utils/homeData"
import BreadcrumbNav from "@/app/components/ui/breadcrumb-nav"
import ShopBanner from "@/app/components/shop/ShopBanner"
import ShopInfo from "@/app/components/shop/ShopInfo"
import ProductsSection from "@/app/components/shop/ProductsSection"
import { shopData, productsSection } from "@/app/utils/shopData"

export default function ShopPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Shop" }
  ]

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl px-4 py-4">
        <BreadcrumbNav items={breadcrumbItems} />
      </div>
      
      {/* Hero Banner */}
      <ShopBanner 
        title={shopData.banner.title}
        description={shopData.banner.description}
        imageSrc={shopData.banner.imageSrc}
        ctaText={shopData.banner.ctaText}
        ctaLink={shopData.banner.ctaLink}
      />

      {/* Shop Information */}
      <ShopInfo 
        title={shopData.info.title}
        description={shopData.info.description}
        features={shopData.info.features}
      />

      {/* Products Section */}
      <ProductsSection 
        title={productsSection.title}
        description={productsSection.description}
        products={products}
      />
    </div>
  )
}
