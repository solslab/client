import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './ui/global.css';
import Topnav from './ui/navigation/topNav';
import LastPathSetter from './ui/lastPathSetter';
import PrelineScript from './ui/PrelineScript';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import Script from 'next/script';

const pretendard = localFont({
	src: '../public/fonts/PretendardVariable.woff2',
	display: 'swap',
	weight: '45 920',
	variable: '--font-pretendard'
});

export const metadata: Metadata = {
	title: '몇솔'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="kr" className={`${pretendard.variable}`}>
			<link rel="icon" href="/favicon.png" sizes="any" />
			<Script
				strategy="afterInteractive"
				src={`https://www.googletagmanager.com/gtm.js?id=GTM-57ML2L7S`}
			/>
			<GoogleTagManager gtmId="GTM-57ML2L7S" />
			<body className={`${pretendard.className}`}>
				<LastPathSetter />
				<Topnav />
				<main className="pt-16">{children}</main>
				<footer className="py-16">
					<div className="text-center text-gray-500">2024 © solslab Corp.</div>
				</footer>
			</body>
			<GoogleAnalytics gaId="G-9PG6DER9G1" />
			<PrelineScript />
		</html>
	);
}
