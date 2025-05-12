import React from "react";
import clsx from "clsx"; // Optional: Use clsx or classnames for class merging

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={clsx(
        "w-full minh-h-56 p-5 flex flex-col bg-Colors-Background-Card rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}