import type { Metadata } from "next";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import "./globals.css";
import AuthInit from "./components/layout/AuthInit";

export const metadata: Metadata = {
  title: "Huong Que",
  description: "Huong Que - Your trusted source for quality products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  return (
    <html lang="en">
      <body>
        <AuthInit/>
        <main>
          <Header />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
