
import HomeBanner from "./components/home/HomeBanner";
import HomeProducts from "./components/home/HomeProducts";
import axiosInstance from "@/lib/axiosInstance";

export default async function Home() {
  const url = process.env.BACKEND_URL;
 const res = await axiosInstance.get("http://localhost:8080/productservice/top", {
    params: { count: 12 },
  });
  const products = res.data;
  console.log(products)

  

  return (
    <div className="flex flex-col p-[96px]">
      <HomeBanner />
      <HomeProducts products={products}/>
      {/* Why choose us */}
      <div className="">
        
      </div>
      {/* Reviews */}
      <div className=""></div>
      {/* Newsletter */}
      <div className=""></div>
    </div>
  );
}