import HomeBanner from "./components/home/HomeBanner";
import HomeProducts from "./components/home/HomeProducts";
import { useAuthStore } from "./stores/authStore";

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