import Home from './components/Home';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: '몇솔 | 개발자 취업 준비 필수 플랫폼',
	description:
		'기업별 코딩테스트 정보를 한 번에. 지원자들의 100% 리얼 후기로 더 확실하게 대비하세요.',
	keywords:
		'기업 코딩테스트, 코딩테스트 정보, 코딩테스트 후기, 프로그래머스, 개발자 취업, IT 기업 채용, 코딩테스트 언어, 코딩테스트 준비, 코딩테스트 합격, 코딩테스트 난이도, 비대면 코딩테스트, 개발자 채용 플랫폼',
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

export default function Page({
	searchParams
}: {
	searchParams?: {
		query?: string;
	};
}) {
	const query = searchParams?.query || '';
	return <Home query={query} />;
}
