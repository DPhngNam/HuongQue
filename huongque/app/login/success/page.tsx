"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");

  return (
    <div>
      <span className="text-2xl font-bold">Login Success</span>
      <div className="flex flex-col gap-4">
        <span className="text-sm font-bold">Access Token: {accessToken}</span>
        <span className="text-sm font-bold">Refresh Token: {refreshToken}</span>
      </div>
    </div>
  );
}