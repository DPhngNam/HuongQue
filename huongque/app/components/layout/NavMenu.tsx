import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export default function NavMenu() {
  const categories = [
    { name: "Điện thoại", href: "/category/phone" },
    { name: "Máy tính bảng", href: "/category/tablet" },
    { name: "Laptop", href: "/category/laptop" },
    { name: "Phụ kiện", href: "/category/accessories" },
  ];
  return (
    <div>
      <NavigationMenu className=" rounded-lg  flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/">Trang Chủ</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <NavigationMenuLink href="/category">Danh mục</NavigationMenuLink>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {categories.map((category) => (
                  <li key={category.name}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={category.href}
                        className="block p-2 hover:bg-gray-100 rounded"
                      >
                        {category.name}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
