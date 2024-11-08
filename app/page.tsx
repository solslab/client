import FullPageScroll from './components/FullPageScroll';
import Container from './ui/container';
import Float from './ui/interaction/float';
import ClientSearchBox from './ui/clientSearchBox';
import { Metadata } from 'next';
import Script from 'next/script';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import FadeIn from './motion/FadeIn';

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

const LogoCarousel = dynamic(() => import('./components/LogoCarousel'), {
	ssr: false,
	loading: () => <p>로딩 중...</p>
});

export default function Home({
	searchParams
}: {
	searchParams?: {
		query?: string;
	};
}) {
	const query = searchParams?.query || '';
	return (
		<div className="h-screen">
			<Script
				id="jsonLd"
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<FullPageScroll>
				<section className="h-full w-full items-center justify-center bg-white">
					<div className="flex flex-col items-center justify-between">
						<div className="relative flex w-full items-center justify-center">
							<Float />
							<div className="flex h-full w-full items-center justify-center bg-white bg-opacity-65 backdrop-blur-sm">
								<FadeIn>
									<Container className="relative flex h-46 max-w-7xl justify-center">
										<div className="z-30 flex flex-col items-center justify-center">
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
									</Container>
								</FadeIn>
							</div>
						</div>
						<div className="hidden lg:block"></div>
						<Image
							className="animate-bounce"
							src="/icons/scroll.svg"
							alt="scroll"
							width={40}
							height={40}
						/>
					</div>
				</section>

				<section className="flex h-full w-full flex-col items-center justify-between">
					<div />
					<FadeIn>
						<article className="flex flex-col gap-2 text-center">
							<h2 className="bg-gradient-text-1 bg-clip-text text-xl font-bold text-transparent md:text-2xl">
								이 기업 코딩테스트, 내가 합격할 수 있을까?
							</h2>
							<span className="text-sm text-gray-80 md:text-base">
								응시 환경부터 합격자 후기까지 한눈에 볼 수 있어요
							</span>
						</article>
						<div className="flex w-full max-w-4xl flex-col items-center justify-center gap-8 py-8">
							<LogoCarousel />
							<Link
								className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 font-semibold text-white transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:shadow-md"
								href="/company"
							>
								기업 전체 보기 →
							</Link>
						</div>
					</FadeIn>
					<FadeIn>
						<div className="flex flex-col gap-5">
							<h2 className="bg-gradient-text-1 bg-clip-text text-2xl font-bold text-transparent">
								여러분의 후기를 들려주세요!
							</h2>
							<Link
								className="rounded-[10px] border-2 border-main-base px-6 py-4 text-center font-bold text-main-base"
								href="/testReview"
							>
								코딩테스트 후기 작성하기
							</Link>
						</div>
						<div className="py-16">
							<div className="text-center text-black">2024 © solslab Corp.</div>
						</div>
					</FadeIn>
				</section>
			</FullPageScroll>
		</div>
	);
}
