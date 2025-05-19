import { ShopData } from "../models/Shop.model";

// We can't directly use JSX in TypeScript data files, so we'll use string identifiers instead
// and render the actual components in the React components
export const shopData: ShopData = {
  banner: {
    title: "Huong Que Shop",
    description: "Discover our premium collection of authentic Vietnamese products",
    imageSrc: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop",
    ctaText: "Shop Now",
    ctaLink: "#products"
  },
  info: {
    title: "About Our Shop",
    description: "Huong Que brings you the finest Vietnamese products, carefully selected to ensure quality and authenticity. Our mission is to share the rich culture and traditions of Vietnam through our premium offerings.",
    features: [
      {
        icon: "Leaf", // Using string identifier instead of JSX
        title: "Authentic Products",
        description: "All our products are sourced directly from Vietnam, ensuring authenticity and quality in every purchase.",
        bgColor: "bg-green-100",
        iconColor: "text-green-600"
      },
      {
        icon: "Package", // Using string identifier instead of JSX
        title: "Carefully Packaged",
        description: "We take extra care in packaging to ensure your products arrive in perfect condition.",
        bgColor: "bg-blue-100",
        iconColor: "text-blue-600"
      },
      {
        icon: "Truck", // Using string identifier instead of JSX
        title: "Fast Shipping",
        description: "Enjoy quick delivery with our efficient shipping process, bringing Vietnam to your doorstep.",
        bgColor: "bg-purple-100",
        iconColor: "text-purple-600"
      }
    ]
  }
};

export const productsSection = {
  title: "Our Products",
  description: "Browse our collection of authentic Vietnamese products"
};

// Shop contact information for the ShopAvatar component
export const shopContactInfo = {
  shopName: "Huong Que Shop",
  shopImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1374&auto=format&fit=crop",
  shopDescription: "Authentic Vietnamese products sourced directly from local artisans and farmers. We focus on quality, tradition, and sustainability.",
  contactInfo: {
    email: "contact@huongque.com",
    phone: "+84 123 456 789",
    address: "123 Nguyen Hue Street, District 1, Ho Chi Minh City, Vietnam",
    website: "https://huongque.com"
  }
};
