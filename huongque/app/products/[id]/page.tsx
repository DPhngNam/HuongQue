'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ProductGallery from '@/app/components/products/ProductGallery'
import ProductReviews from '@/app/components/products/ProductReviews'
import BreadcrumbNav from '@/app/components/ui/breadcrumb-nav'
import { Minus, Plus, Heart } from 'lucide-react'

// This would typically come from your API or database
const productData = {
  id: '1',
  name: 'Sleepless Night 10 g',
  price: 97,
  description: "A premium blend designed for those seeking a peaceful night's rest. This carefully crafted mixture combines natural ingredients known for their calming properties.",
  features: [
    'Natural ingredients',
    'Calming aroma',
    'No artificial additives',
    'Sustainably sourced'
  ],
  specifications: {
    'Weight': '10g',
    Form: 'Loose leaf',
    Origin: 'Vietnam',
    Storage: 'Keep in a cool, dry place'
  },
  images: [
    {
      id: '1',
      url: 'https://placehold.co/600x600/png?text=Product+Image+1',
      alt: 'Product image 1'
    },
    {
      id: '2',
      url: 'https://placehold.co/600x600/png?text=Product+Image+2',
      alt: 'Product image 2'
    },
    {
      id: '3',
      url: 'https://placehold.co/600x600/png?text=Product+Image+3',
      alt: 'Product image 3'
    }
  ],
  reviews: [
    {
      id: '1',
      author: 'John Doe',
      rating: 5,
      comment: 'Excellent product! Really helped me with my sleep issues.',
      date: '2024-03-15'
    },
    {
      id: '2',
      author: 'Jane Smith',
      rating: 4.5,
      comment: 'Great quality and fast shipping. Would recommend!',
      date: '2024-03-10'
    }
  ],
  averageRating: 4.8,
  totalReviews: 2
}

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1)

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: productData.name }
  ]

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <BreadcrumbNav items={breadcrumbItems} />
        
        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
          {/* Product Gallery */}
          <ProductGallery images={productData.images} />

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">{productData.name}</h1>
            <p className="mt-4 text-2xl font-semibold">${productData.price}</p>

            <div className="mt-6">
              <p className="text-gray-600">{productData.description}</p>
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
              <Button className="flex-1">Add to Cart</Button>
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
            </div>

            <Separator className="my-8" />

            <Tabs defaultValue="description" className="flex-1">
              <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <h3 className="font-semibold">Features</h3>
                <ul className="mt-4 list-inside list-disc space-y-2">
                  {productData.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="specifications" className="mt-4">
                <div className="space-y-4">
                  {Object.entries(productData.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b pb-2">
                      <span className="font-medium">{key}</span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Reviews Section */}
        <Separator className="my-16" />
        <ProductReviews
          reviews={productData.reviews}
          averageRating={productData.averageRating}
          totalReviews={productData.totalReviews}
        />
      </div>
    </div>
  )
} 