'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SocialLoginSuccess() {
  const router = useRouter();

  useEffect(() => {
    // You can add any post-login logic here
    // For example, redirecting to the home page after a short delay
    const timer = setTimeout(() => {
      router.push('/');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Login Successful!</h1>
        <p>Redirecting you to the home page...</p>
      </div>
    </div>
  );
}
