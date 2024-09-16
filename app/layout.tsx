import type { Metadata } from "next";
import localFont from "next/font/local";
import "./ui/global.css";
import Topnav from "./ui/navigation/topNav";
import LastPathSetter from "./ui/lastPathSetter";
import PrelineScript from "./ui/PrelineScript";
const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "몇솔",
  description: "기업별 코딩테스트 정보를 제공하는 사이트",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr" className={`${pretendard.variable}`}>
      <link rel="icon" href="/favicon.png" sizes="any" />
      <body className={pretendard.className}>
        <Topnav />
        <LastPathSetter />
        <main className="min-h-screen">{children}</main>
        <footer className="py-16">
          <div className="text-center text-gray-500 ">2024 © solslab Corp.</div>
        </footer>
      </body>
      <PrelineScript />
    </html>
  );
}
