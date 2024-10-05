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
	title: '몇솔 | 개발자 취업 준비 필수 플랫폼',
	description:
		'기업별 코딩테스트 정보를 한 번에. 지원자들의 100% 리얼 후기로 더 확실하게 대비하세요.',
	icons: {
		icon: '/favicon.png'
	},
	openGraph: {
		title: '몇솔 | 개발자 취업 준비 필수 플랫폼',
		description:
			'기업별 코딩테스트 정보를 한 번에. 지원자들의 100% 리얼 후기로 더 확실하게 대비하세요.',
		siteName: '몇솔',
		images: [
			{
				url: 'https://sols.kr/og.png',
				width: 1200,
				height: 628,
				alt: 'openGraph Image'
			}
		]
	}
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
			<body className={pretendard.className}>
				<Topnav />
				<LastPathSetter />
				<main className="min-h-screen">{children}</main>
				<footer className="py-16">
					<div className="text-center text-gray-500">2024 © solslab Corp.</div>
				</footer>
			</body>
			<GoogleAnalytics gaId="G-9PG6DER9G1" />
			<PrelineScript />
		</html>
	);
}
