import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { ReactQueryProvider } from "@/provider/ReactQueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TrueMilk E-Commerce",
  description: "Premium E-Commerce Experience",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gray-50`}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </Suspense>
    </div>
  );
}
