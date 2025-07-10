import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "EcoBoost Energy Platform",
    template: "%s | EcoBoost Energy Platform",
  },
  description: "산업통상자원부 공공데이터 기반 에너지 효율화 플랫폼 - 중소기업 에너지 사용 분석 및 신재생에너지 잠재력 평가",
  keywords: ["에너지", "효율화", "공공데이터", "산업통상자원부", "중소기업", "신재생에너지", "에너지절약", "ESG", "탄소중립"],
  authors: [{ name: "박용환" }],
  creator: "박용환",
  publisher: "EcoBoost Energy Platform",
  applicationName: "EcoBoost Energy Platform",
  category: "Energy",
  classification: "Business",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "EcoBoost Energy Platform",
    description: "산업통상자원부 공공데이터 기반 에너지 효율화 플랫폼",
    type: "website",
    locale: "ko_KR",
    siteName: "EcoBoost Energy Platform",
    url: "https://ecoboost-energy-platform.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "EcoBoost Energy Platform",
    description: "산업통상자원부 공공데이터 기반 에너지 효율화 플랫폼",
    creator: "@ecoboost_energy",
  },
  alternates: {
    canonical: "https://ecoboost-energy-platform.com",
  },
  verification: {
    google: "your-google-verification-code",
    other: {
      "naver-site-verification": "your-naver-verification-code",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
