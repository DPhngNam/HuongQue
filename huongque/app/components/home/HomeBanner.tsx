'use client'

import Link from "next/link"
import Image from "next/image"

export default function HomeBanner() {
    return (
        <div className="w-full bg-white">
            <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                    {/* Left side - Text content */}
                    <div className="flex flex-col space-y-6 lg:w-1/2">
                        <span className="text-blue-600 font-medium">- Skincare Products</span>
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                            We Offer the Best Products for your Skin
                        </h1>
                        <Link 
                            href="/products"
                            className="inline-flex w-fit items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-emerald-600 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
                        >
                            Shop Now
                        </Link>
                    </div>

                    {/* Right side - Image */}
                    <div className="lg:w-1/2">
                        <div className="relative">
                            <Image
                                src="/image/banner.png"
                                alt="Skincare products with leaves"
                                width={600}
                                height={400}
                                className="w-full object-cover"
                                priority
                            />
                            {/* Decorative elements */}
                            <div className="absolute -top-4 -left-4 w-72 h-72 bg-emerald-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                            <div className="absolute -bottom-8 right-0 w-72 h-72 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}