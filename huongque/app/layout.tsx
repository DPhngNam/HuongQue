import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import "./globals.css";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Huong Que',
  description: 'Huong Que - Your trusted source for quality products',
}

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
