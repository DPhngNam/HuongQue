"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/app/stores/authStore";

export default function SocialLoginSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const accessToken = searchParams.get("access_token");
  const refreshToken = searchParams.get("refresh_token");
  const { setTokens } = useAuthStore();

  useEffect(() => {
    // You can add any post-login logic here
    // For example, redirecting to the home page after a short delay
    // You can also store tokens in localStorage or cookies here
    if (accessToken && refreshToken) {
      setTokens(accessToken, refreshToken);
    }
    const timer = setTimeout(() => {
      router.push("/");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router, accessToken, refreshToken]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Login Successful!</h1>
        <p>Redirecting you to the home page...</p>
      </div>
    </div>
  );
}
