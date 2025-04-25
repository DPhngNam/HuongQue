import Image from "next/image";
import HomeBanner from "./components/HomeBanner";
import HomeProducts from "./components/HomeProducts";

export default function Home() {
  return (
    <div className="flex flex-col p-[96px]">
      <HomeBanner />
      <HomeProducts/>
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