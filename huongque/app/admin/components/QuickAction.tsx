'use client'

import Link from "next/link";

interface QuickActionProps {
  title: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  bgColor: string;
  iconBg: string;
}

export default function QuickAction({
  title,
  icon,
  href,
  onClick,
  bgColor,
  iconBg,
}: QuickActionProps) {
  const className = `w-full flex items-center gap-3 p-3 ${bgColor} rounded-xl transition-all duration-200 text-left hover:scale-105 transform cursor-pointer`;
  
  const content = (
    <>
      <div className={`${iconBg} text-white p-2 rounded-lg shadow-sm`}>
        {icon}
      </div>
      <span className="font-medium text-gray-700">{title}</span>
    </>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={className}>
        {content}
      </button>
    );
  }

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <div className={className}>
      {content}
    </div>
  );
}
