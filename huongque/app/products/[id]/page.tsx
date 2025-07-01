"use client";

import ShopAvatar from "@/app/components/shop/ShopAvatar";
import BreadcrumbNav from "@/app/components/ui/breadcrumb-nav";
import Tabs from "@/app/components/ui/tabs";
import { CartItem } from "@/app/models/cart";
import { ProductProps } from "@/app/models/Product.model";
import { useCartStore } from "@/app/stores/cartStore";
import { products } from "@/app/utils/homeData";
import { shopContactInfo } from "@/app/utils/shopData";
import { useParseProductDescription } from "@/hooks/use-parse-product-description";
import axiosInstance from "@/lib/axiosInstance";
import { Check, Heart, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function ShopProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrap params using React.use()
  const resolvedParams = use(params);
  const [quantity, setQuantity] = useState(1);

  const [addedToCart, setAddedToCart] = useState(false);
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<
    ProductProps & { description?: string; color?: string; imageAlt?: string }
  >({
    id: "",
    name: "",
    price: 0,
    images: [],
    categoryId: "",
    categoryName: "",
    createAt: "",
    label: "",
    description: "",
    color: "",
    imageAlt: "",
  });

  const addItem = useCartStore((state) => state.addItem);
  
  // Parse the product description into separate sections
  const { mainContent, certificates, hasCertificates } = useParseProductDescription(product.description || "");
  
  // Debug logging
  console.log("Has certificates:", hasCertificates);
  console.log("Main content length:", mainContent.length);
  console.log("Certificates length:", certificates.length);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(
          `/productservice/${resolvedParams.id}`
        );
        setProduct(res.data);
      } catch (error: any) {
        console.error("Error fetching product:", error);
        if (!error.response) {
          console.error("Network error or server unavailable");
        }
      }
    };

    fetchProduct();
  }, [resolvedParams.id]);
  console.log("Product data:", product);

  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Cửa hàng", href: "/shop" },
    { label: product?.name || "Không tìm thấy sản phẩm" },
  ];

  // Handle quantity change
  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (!product) return;

    // Create a cart item from the product
    const cartItem: CartItem = {
      productId: String(product.id),
      productName: product.name,
      price: typeof product.price === "number" ? product.price : 0,
      quantity: quantity,
      productImage:
        product.images && product.images.length > 0 ? product.images[0] : "",
    };

    console.log("Adding to cart:", cartItem);

    // Add to cart using the Zustand store
    addItem(cartItem);

    // Show success message
    setAddedToCart(true);

    // Reset success message after 2 seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-2 py-4 sm:px-4 md:px-6 lg:px-8">
        <BreadcrumbNav items={breadcrumbItems} />
        <div className="mt-8 grid grid-cols-1 gap-y-10 gap-x-8 md:grid-cols-2">
          {/* Product Image */}
          <div className="aspect-square w-full max-w-md mx-auto overflow-hidden rounded-lg border bg-gray-100 flex items-center justify-center">
            <Image
              src={
                product.images && product.images.length > 0
                  ? product.images[0]
                  : "/no-image.png"
              }
              alt={product.imageAlt || product.name}
              width={600}
              height={600}
              className="h-full w-full object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between  mt-6 md:mt-0">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold break-words">
                {product.name}
              </h1>
              <p className="mt-2 md:mt-4 text-xl md:text-2xl font-semibold text-blue-700">
                {product.price > 0
                  ? `${product.price.toLocaleString()}₫`
                  : "Liên hệ"}
              </p>
            </div>

            {product.label && (
              <div className="mt-2">
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                  {product.label}
                </span>
              </div>
            )}

            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-stretch gap-4">
              <div className="flex items-center rounded-lg border w-full sm:w-auto justify-between">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 min-w-[32px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-2 hover:bg-gray-100"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-2 px-4 text-white rounded-md transition-colors flex items-center justify-center gap-2 ${addedToCart
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-blue-600 hover:bg-blue-700"
                  }`}
                disabled={addedToCart}
              >
                {addedToCart ? (
                  <>
                    <Check className="h-4 w-4" />
                    Đã thêm vào giỏ hàng
                  </>
                ) : (
                  "Thêm vào giỏ hàng"
                )}
              </button>
              <button className="p-2 border rounded-md hover:bg-gray-100 flex items-center justify-center">
                <Heart className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        {/* Product Description */}
        <div className="mt-8 flex flex-col">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Thông tin sản phẩm</h3>
          {product.description && (
            <>
              {hasCertificates ? (
                <Tabs
                  tabs={[
                    {
                      id: "info",
                      label: "Thông tin chung",
                      content: (
                        <div
                          className="product-description prose prose-lg max-w-none"
                          dangerouslySetInnerHTML={{ __html: mainContent }}
                        />
                      )
                    },
                    {
                      id: "certificates",
                      label: "Chứng nhận & Xác nhận",
                      content: (
                        <div
                          className="product-description"
                          dangerouslySetInnerHTML={{ __html: certificates }}
                        />
                      )
                    }
                  ]}
                  defaultTab="info"
                />
              ) : (
                <div
                  className="product-description prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              )}
            </>
          )}
        </div>

        <ShopAvatar
          shopName={shopContactInfo.shopName}
          shopImage={shopContactInfo.shopImage}
          shopDescription={shopContactInfo.shopDescription}
          contactInfo={shopContactInfo.contactInfo}
        />

        {/* Related Products Section */}
        <div className="mt-16 border-t pt-16">
          <h2 className="text-2xl font-bold">Có thể bạn sẽ thích</h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.slice(0, 4).map(
              (relatedProduct) =>
                String(relatedProduct.id) !== String(product.id) && (
                  <div key={relatedProduct.id} className="group relative">
                    <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80 flex items-center justify-center">
                      <Image
                        src={relatedProduct.imageSrc}
                        alt={relatedProduct.imageAlt}
                        width={300}
                        height={300}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <Link href={`/shop/${relatedProduct.id}?source=shop`}>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {relatedProduct.name}
                          </Link>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {relatedProduct.color}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        {relatedProduct.price.toLocaleString()}₫
                      </p>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
