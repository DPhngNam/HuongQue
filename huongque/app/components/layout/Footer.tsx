import { IoLogoChrome } from "react-icons/io";
import { FaInstagram } from "react-icons/fa6";
import { LuFacebook } from "react-icons/lu";
import { BiLogoGmail } from "react-icons/bi";

export default function Footer() {
  const categories = [
    "Category 1",
    "Category 2",
    "Category 3",
    "Category 4",
    "Category 5",
    "Category 6",
    "Category 7",
    "Category 8",
];
  return (
    <footer className="bg-transparent mt-10 border-t p-4 grid grid-cols-4 gap-4">
      {/* Column 1 */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-1">
          <IoLogoChrome className="text-2xl" />
          <span className="font-bold text-sm">Huong Que</span>
        </div>
        <div className="flex gap-4  items-start">
          <FaInstagram className="text-2xl" />
          <LuFacebook className="text-2xl" />
          <BiLogoGmail className="text-2xl" />
        </div>
      </div>

      {/* Column 2 */}
      <div className="flex flex-col gap-4">
        <h3 className="font-bold text-sm">Danh mucj sanr  </h3>
        <p className="text-sm">Learn more about our mission and values.</p>
      </div>

      {/* Column 3 */}
      <div className="flex flex-col gap-4">
        <h3 className="font-bold text-sm">Support</h3>
        <p className="text-sm">Contact us for help and support.</p>
      </div>

      {/* Column 4 */}
      <div className="flex flex-col gap-4">
        <h3 className="font-bold text-sm">Newsletter</h3>
        <p className="text-sm">Subscribe to our newsletter for updates.</p>
      </div>
    </footer>
  );
}
