import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "./components/layout/LayoutWrapper";

export const metadata: Metadata = {
  title: "Huong Que",
  description: "Huong Que - Your trusted source for quality products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
