"use client";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
