import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-64 h-56 flex flex-col bg-Colors-Background-Card rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
      {children}
    </div>
  );
}
