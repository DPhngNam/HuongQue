import HomeBanner from "./components/home/HomeBanner";
import HomeProducts from "./components/home/HomeProducts";
export default async function Home() {

  // const res = await axiosInstance.get(`/productservice/top`, {
  //   params: { count: 12 },
  // });


  return (
    <div className="flex flex-col p-[96px]">
      <HomeBanner />
      <HomeProducts products={[]} />
      {/* Why choose us */}
      <div className=""></div>
      {/* Reviews */}
      <div className=""></div>
      {/* Newsletter */}
      <div className=""></div>
    </div>
  );
}
