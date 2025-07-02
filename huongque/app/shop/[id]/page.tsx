'use client'

import Products from "@/app/components/home/Products"
import ProductsSection from "@/app/components/shop/ProductsSection"
import { ShopInfoProps } from "@/app/components/shop/ShopAvatar"
import ShopBanner from "@/app/components/shop/ShopBanner"
import ShopInfo from "@/app/components/shop/ShopInfo"
import BreadcrumbNav from "@/app/components/ui/breadcrumb-nav"
import { products } from "@/app/utils/homeData"
import { productsSection, shopData } from "@/app/utils/shopData"
import axiosInstance from "@/lib/axiosInstance"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function ShopPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
  ]
  const {id}= useParams()

  const [shopInfo, setShopInfo] = useState<ShopInfoProps | null>(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchShopInfo = async () => {
      try {
        const res = await axiosInstance.get(`/tenantservice/tenant/${id}`);
        setShopInfo(res.data);
      } catch (error) {
        console.error("Error fetching shop info:", error);
      }
    };

    fetchShopInfo();
  }, [id]);


 useEffect(()=>{
  const fetchProducts = async () => {
    try{
      const res = await axiosInstance.get(`/productservice/`,{
        headers:{
          'X-Tenant-ID': id
        }
      });
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  fetchProducts();
 }, [id]);
 console.log(products);




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
     <Products products={products} />
    </div>
  )
}
