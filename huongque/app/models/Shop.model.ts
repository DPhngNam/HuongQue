export interface ShopBannerProps {
  title: string;
  description: string;
  imageSrc: string;
  ctaText: string;
  ctaLink: string;
}

export interface ShopFeatureProps {
  icon: string; // Using string identifier instead of React.ReactNode
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

export interface ShopInfoProps {
  title: string;
  description: string;
  features: ShopFeatureProps[];
}

export interface ShopData {
  banner: ShopBannerProps;
  info: ShopInfoProps;
}
