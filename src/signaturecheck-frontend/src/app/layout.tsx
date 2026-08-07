import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";

import { QueryProvider } from "@/components/query-provider";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kiểm tra chữ ký số online miễn phí",
    template: "%s | Automation",
  },
  description:
    "Tải lên PDF, XML, P7S hoặc P7M để kiểm tra chữ ký số, chứng thư số, chuỗi CA và OCSP/CRL theo thời gian thực.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/brand/logo-mark-192.png", type: "image/png", sizes: "192x192" }],
    apple: [{ url: "/brand/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Kiểm tra chữ ký số online miễn phí",
    description: "Công cụ tiếng Việt giúp kiểm tra chữ ký số trên PDF, XML, P7S và P7M.",
    type: "website",
    locale: "vi_VN",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: "/images/guide-digital-signature.jpg",
        width: 1660,
        height: 947,
        alt: "Tài liệu điện tử, chứng thư và thiết bị ký số",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiểm tra chữ ký số online miễn phí",
    description: "Công cụ tiếng Việt giúp kiểm tra chữ ký số trên PDF, XML, P7S và P7M.",
    images: ["/images/guide-digital-signature.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="vi" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
