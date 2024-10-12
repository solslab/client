import Container from './ui/container';
import Float from './ui/interaction/float';
import ClientSearchBox from './ui/clientSearchBox';
import { Metadata } from 'next';
import Script from 'next/script';

const jsonLd = {
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	url: 'https://sols.kr/',
	name: '몇솔',
	image: 'https://sols.kr/favicon.png',
	description:
		'기업별 코딩테스트 정보를 한 번에. 지원자들의 100% 리얼 후기로 더 확실하게 대비하세요.'
};

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

export default function Home({
	searchParams
}: {
	searchParams?: {
		query?: string;
	};
}) {
	const query = searchParams?.query || '';
	let isFocused = false;
	console.log(process.memoryUsage());
	return (
		<>
			<Script
				id="jsonLd"
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<div className="flex flex-col items-center justify-between">
				<div className="relative flex w-full items-center justify-center">
					<Float />

					<div className="flex h-full w-full items-center justify-center bg-white bg-opacity-65 backdrop-blur-sm">
						<Container className="relative flex h-46 max-w-7xl justify-center">
							<div className="z-30 flex flex-col items-center justify-center">
								<div>
									<div className="text-3xl">
										<div className="bg-gradient-text-2 bg-clip-text pb-6 text-center font-extrabold text-transparent">
											더 빠르고, 쉽게
										</div>
										<div className="hidden bg-gradient-text-2 bg-clip-text pb-16 text-center font-extrabold text-transparent sm:block">
											기업 코딩테스트를 준비하는 방법
										</div>
										<div className="block bg-gradient-text-2 bg-clip-text pb-6 text-center font-extrabold text-transparent sm:hidden">
											기업 코딩테스트를
										</div>
										<div className="block bg-gradient-text-2 bg-clip-text pb-16 text-center font-extrabold text-transparent sm:hidden">
											준비하는 방법
										</div>
									</div>

									<ClientSearchBox />
								</div>
							</div>
						</Container>
					</div>
				</div>
				<div className="hidden lg:block"></div>
			</div>
		</>
	);
}
