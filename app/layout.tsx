import './ui/global.css';

import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

import AdminPageLayout from '@/app/admin/components/admin-page-layout';
import Footer from './ui/common/Footer';
import LastPathSetter from './ui/common/lastPathSetter';
import type { Metadata } from 'next';
import PrelineScript from './ui/common/PrelineScript';
import Script from 'next/script';
import ScrollbarHandler from './ui/common/ScrollbarHandler';
import Topnav from './ui/navigation/topNav';
import { headers } from 'next/headers';
import localFont from 'next/font/local';

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
				<ScrollbarHandler />
				<LastPathSetter />
				<Topnav />
				<AdminPageLayout></AdminPageLayout>
				<main>{children}</main>
				<Footer />
			</body>
			<GoogleAnalytics gaId="G-9PG6DER9G1" />
			<PrelineScript />
		</html>
	);
}
