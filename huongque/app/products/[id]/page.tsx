'use client'

import ShopAvatar from '@/app/components/shop/ShopAvatar'
import BreadcrumbNav from '@/app/components/ui/breadcrumb-nav'
import { CartItem } from '@/app/models/cart'
import { useCartStore } from '@/app/stores/cartStore'
import { products } from "@/app/utils/homeData"
import { shopContactInfo } from '@/app/utils/shopData'
import { Check, Heart, Minus, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { use, useEffect, useState } from 'react'

export default function ShopProductPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params using React.use()
  const resolvedParams = use(params)
  const [quantity, setQuantity] = useState(1)
  const [showShopInfo, setShowShopInfo] = useState(true)
  const [addedToCart, setAddedToCart] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const addItem = useCartStore(state => state.addItem)
  
  // Find the product by ID
  // Handle potential parsing errors with a fallback
  const productId = resolvedParams.id ? Number(resolvedParams.id) : 0
  const product = products.find(p => p.id === productId)

  // Check where user came from and set shop info visibility accordingly
  useEffect(() => {
    const source = searchParams.get('source')
    // Only show shop info if explicitly coming from shop page
    // If coming from home, cart, or other pages, don't show shop info
    if (source === 'shop') {
      setShowShopInfo(true)
    } else {
      // Explicitly handle other sources
      if (source === 'home' || source === 'cart' || !source) {
        setShowShopInfo(true)
      } else {
        // Default behavior for any other unrecognized source
        setShowShopInfo(true)
      }
    }
  }, [searchParams])

  // Breadcrumb navigation
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: product?.name || "Product Not Found" }
  ]

  // Handle quantity change
  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  // Handle add to cart
  const handleAddToCart = () => {
    if (!product) return;
    
    // Create a cart item from the product
    const cartItem: CartItem = {
      id: String(product.id),
      name: product.name,
      price: parseFloat(product.price.replace('$', '')),
      quantity: quantity,
      image: product.imageSrc
    }
    
    // Add to cart using the Zustand store
    addItem(cartItem)
    
    // Show success message
    setAddedToCart(true)
    
    // Reset success message after 2 seconds
    setTimeout(() => {
      setAddedToCart(false)
    }, 2000)
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <BreadcrumbNav items={breadcrumbItems} />
          
          <div className="min-h-[50vh] flex flex-col items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">Product Not Found</h1>
              <p className="mt-4 text-lg text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
              <div className="mt-8 flex gap-4 justify-center">
                <Link 
                  href="/shop" 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Browse Shop
                </Link>
                <Link 
                  href="/" 
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Return Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <BreadcrumbNav items={breadcrumbItems} />
        
        {/* Shop Avatar - Only shown when navigating from shop page */}
        {showShopInfo && (
          <ShopAvatar 
            shopName={shopContactInfo.shopName}
            shopImage={shopContactInfo.shopImage}
            shopDescription={shopContactInfo.shopDescription}
            contactInfo={shopContactInfo.contactInfo}
          />
        )}
        
        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden rounded-lg border bg-gray-100">
            <Image
              src={product.imageSrc}
              alt={product.imageAlt}
              width={600}
              height={600}
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="mt-4 text-2xl font-semibold">{product.price}</p>
            
            {product.label && (
              <div className="mt-2">
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                  {product.label}
                </span>
              </div>
            )}

            <div className="mt-6">
              <p className="text-gray-600">
                This premium product offers exceptional quality and value. Perfect for everyday use or special occasions.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center rounded-lg border">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-2 hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-2 hover:bg-gray-100"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button 
                onClick={handleAddToCart}
                className={`flex-1 py-2 px-4 text-white rounded-md transition-colors flex items-center justify-center gap-2 ${addedToCart ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                disabled={addedToCart}
              >
                {addedToCart ? (
                  <>
                    <Check className="h-4 w-4" />
                    Added to Cart
                  </>
                ) : (
                  'Add to Cart'
                )}
              </button>
              <button className="p-2 border rounded-md hover:bg-gray-100">
                <Heart className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-8 border-t pt-8">
              <h3 className="text-lg font-medium">Product Details</h3>
              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">
                  Color: {product.color}
                </p>
                <p className="text-sm text-gray-600">
                  This product features premium materials and expert craftsmanship, ensuring durability and satisfaction. Perfect for everyday use, it combines style and functionality in one elegant package.
                </p>
              </div>
            </div>

            <div className="mt-8 border-t pt-8">
              <h3 className="text-lg font-medium">Shipping & Returns</h3>
              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">
                  Free shipping on all domestic orders over $50. Returns accepted within 30 days of delivery.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16 border-t pt-16">
          <h2 className="text-2xl font-bold">You might also like</h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.slice(0, 4).map((relatedProduct) => (
              relatedProduct.id !== product.id && (
                <div key={relatedProduct.id} className="group relative">
                  <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
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
                          <span aria-hidden="true" className="absolute inset-0" />
                          {relatedProduct.name}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{relatedProduct.color}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{relatedProduct.price}</p>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
