"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Libre_Barcode_39_Text } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const libreBarcode = Libre_Barcode_39_Text({
  variable: "--font-libre-barcode-39-text",
  style: "normal",
  weight: "400",
});

// export const metadata: Metadata = {
//   title: "Cryptica",
//   description: "A sleek and clean password-manager",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${libreBarcode.variable} antialiased`}>
        {children} <ToastContainer />
      </body>
    </html>
  );
}
