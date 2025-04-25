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
    {/* == */}
      <head>
        <title>Huong Que</title>
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
