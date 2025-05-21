'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ProductImage {
  id: string
  url: string
  alt: string
}

interface ProductGalleryProps {
  images: ProductImage[]
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0])

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={selectedImage.url}
          alt={selectedImage.alt}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex gap-4 overflow-x-auto">
        {images.map((image) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(image)}
            className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md ${
              selectedImage.id === image.id ? 'ring-2 ring-black' : 'ring-1 ring-gray-200'
            }`}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
} 