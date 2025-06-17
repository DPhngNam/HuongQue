import { IoLogoChrome } from "react-icons/io";
import { FaInstagram } from "react-icons/fa6";
import { LuFacebook } from "react-icons/lu";
import { BiLogoGmail } from "react-icons/bi";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white mt-10 border-t p-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-700">
      {/* Column 1 */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Image
                      src="/image/logo.png"
                      alt="Hương Quê Logo"
                      width={50}
                      height={50}
                    />
          <span className="font-extrabold text-lg tracking-wide text-green-700">
            Hương Quê
          </span>
        </div>
        <div className="flex gap-4 items-center mt-2">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-2xl hover:text-pink-500 transition" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LuFacebook className="text-2xl hover:text-blue-600 transition" />
          </a>
          <a href="mailto:huongque@gmail.com">
            <BiLogoGmail className="text-2xl hover:text-red-500 transition" />
          </a>
        </div>
      </div>

      {/* Column 2 */}
      <div className="flex flex-col gap-4">
        <h3 className="font-extrabold text-base text-green-700 uppercase tracking-wide">
          Danh mục sản phẩm
        </h3>
        <p className="text-sm text-gray-500">
          Khám phá các sản phẩm đặc sản quê hương chất lượng cao.
        </p>
      </div>

      {/* Column 3 */}
      <div className="flex flex-col gap-4">
        <h3 className="font-extrabold text-base text-green-700 uppercase tracking-wide">
          Hỗ trợ
        </h3>
        <p className="text-sm text-gray-500">
          Liên hệ với chúng tôi để được tư vấn và hỗ trợ nhanh chóng.
        </p>
      </div>

      {/* Column 4 */}
      <div className="flex flex-col gap-4">
        <h3 className="font-extrabold text-base text-green-700 uppercase tracking-wide">
          Nhận tin mới
        </h3>
        <p className="text-sm text-gray-500">
          Đăng ký nhận bản tin để không bỏ lỡ ưu đãi và tin tức mới nhất.
        </p>
      </div>
    </footer>
  );
}
