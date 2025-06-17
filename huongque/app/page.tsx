import axiosInstance from "@/lib/axiosInstance";
import HomeBanner from "./components/home/HomeBanner";
import HomeProducts from "./components/home/HomeProducts";
export default async function Home() {

  
  let products = [];
  try {
    const res = await axiosInstance.get(`/productservice/top`, {
      params: { count: 12 },
    });
    products = res.data || [];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    products = [];
  }
  

  return (
    <div className="flex flex-col p-[96px]">
      <HomeBanner />
      <HomeProducts products={products} />
      {/* Why choose us */}
      <div className=""></div>
      {/* Reviews */}
      <div className=""></div>
      {/* Newsletter */}
      <div className=""></div>
    </div>
  );
}
