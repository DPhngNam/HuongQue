
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/stores/authStore';

const SocialLoginSuccess = () => {
  const router = useRouter();
  const {setTokens} = useAuthStore()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');

      if (accessToken && refreshToken) {
        setTokens(accessToken, refreshToken);

        // Redirect đến trang chính
        router.push('/'); // hoặc trang bạn muốn
      } else {
        // Xử lý lỗi
        console.error('Missing tokens in URL');
        router.push('/login?error=social_login_failed');
      }
    }
  }, [router]);

  return <p>Đang xử lý đăng nhập...</p>;
};

export default SocialLoginSuccess;
