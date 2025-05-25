import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gulshan Laundry - Professional Laundry Services",
  description: "Professional laundry services in Gulshan, Dhaka. We offer dry cleaning, wash & fold, and ironing services with pickup and delivery.",
  keywords: ["laundry service", "dry cleaning", "wash and fold", "ironing", "Gulshan", "Dhaka"],
  authors: [{ name: "Gulshan Laundry" }],
  creator: "Gulshan Laundry",
  publisher: "Gulshan Laundry",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#032B56",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${manrope.variable} antialiased min-h-screen`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
