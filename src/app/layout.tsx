import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "EcoBoost Energy Platform",
  description: "산업통상자원부 공공데이터 기반 에너지 효율화 플랫폼",
  keywords: ["에너지", "효율화", "공공데이터", "산업통상자원부", "중소기업"],
  authors: [{ name: "박용환" }],
  openGraph: {
    title: "EcoBoost Energy Platform",
    description: "산업통상자원부 공공데이터 기반 에너지 효율화 플랫폼",
    type: "website",
    locale: "ko_KR",
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
