'use client'

import Products from "@/app/components/home/Products"
import { ShopInfoProps } from "@/app/components/shop/ShopAvatar"
import ShopHeader from "@/app/components/shop/ShopHeader"
import ShopDetail from "@/app/components/shop/ShopDetail"
import BreadcrumbNav from "@/app/components/ui/breadcrumb-nav"
import axiosInstance from "@/lib/axiosInstance"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function ShopPage() {
  const { id } = useParams()
  
  const [shopInfo, setShopInfo] = useState<ShopInfoProps | null>(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: shopInfo?.name || "...", href: `/shop/${id}` },
  ]

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch shop info and products concurrently
        const [shopInfoRes, productsRes] = await Promise.all([
          axiosInstance.get(`/tenantservice/tenant/${id}`),
          axiosInstance.get(`/productservice/`, {
            headers: {
              'X-Tenant-ID': id
            }
          })
        ]);
        
        setShopInfo(shopInfoRes.data);
        setProducts(productsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);




  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Đang tải thông tin cửa hàng...</p>
      </div>
    );
  }

  if (!shopInfo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-gray-600">Không tìm thấy thông tin cửa hàng.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl px-4 py-4">
        <BreadcrumbNav items={breadcrumbItems} />
      </div>

      {/* Shop Header with dynamic data */}
      <ShopHeader shopInfo={shopInfo} />

      {/* Shop Detailed Information */}
      <ShopDetail shopInfo={shopInfo} />

      {/* Products Section */}
      <div className="w-full bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Sản phẩm của cửa hàng</h2>
          <Products products={products} />
        </div>
      </div>
    </div>
  )
}
