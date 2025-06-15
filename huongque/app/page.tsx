import HomeBanner from "./components/home/HomeBanner";
import HomeProducts from "./components/home/HomeProducts";
import axiosInstance from "@/lib/axiosInstance";

export default async function Home() {

  const res = await axiosInstance.get(`/productservice/top`, {
    params: { count: 12 },
  });
  const products = res.data;

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
