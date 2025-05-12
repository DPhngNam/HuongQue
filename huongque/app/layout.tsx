"use client";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import "./globals.css";
import { useAuthStore } from "./stores/authStore";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {initialize} = useAuthStore.getState();
  initialize();
  return (
    <html lang="en">
      <body>
       
          <Header />
          {children}
          <Footer />
    
      </body>
    </html>
  );
}
