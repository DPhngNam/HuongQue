"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/app/stores/authStore";
import { checkForNewlyApprovedRegistrations } from "@/app/registration/utils/congratulations";
import { jwtDecode } from "jwt-decode";

interface MyJwtPayload {
  email: string;
  [key: string]: any;
}

export const useCheckCongratulations = () => {
  const isLogin = useAuthStore((state) => state.isLogin());
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    const checkCongratulations = async () => {
      if (isLogin && accessToken) {
        try {
          const decodedToken = jwtDecode<MyJwtPayload>(accessToken);
          const userEmail = decodedToken?.email;
          
          if (userEmail) {
            // Small delay to ensure UI is ready
            setTimeout(() => {
              checkForNewlyApprovedRegistrations(userEmail);
            }, 1500);
          }
        } catch (error) {
          console.error("Error checking congratulations:", error);
        }
      }
    };

    checkCongratulations();
  }, [isLogin, accessToken]);
};

export default useCheckCongratulations;
