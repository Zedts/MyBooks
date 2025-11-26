import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "./providers/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MyBooks - Curated Digital Library",
  description: "A curated digital library for the modern intellect. Discover timeless books on design, technology, and philosophy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceMono.variable} ${inter.variable} antialiased`}
      >
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
