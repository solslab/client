'use client';

import FullPageScroll from './FullPageScroll';
import Container from '../container';
import Float from '../interaction/float';
import ClientSearchBox from '../clientSearchBox';
import Script from 'next/script';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import FadeIn from '@/app/ui/motion/FadeIn';
import IndexTrLink from './IndexTrLink';
import { useState } from 'react';
import clsx from 'clsx';
import TierGuard from '../tierGuard';

const jsonLd = {
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	url: 'https://sols.kr/',
	name: '몇솔',
	image: 'https://sols.kr/favicon.png',
	description:
		'기업별 코딩테스트 응시환경 정보부터 합격자 분석, 문제 유형과 후기까지! 코딩테스트 합격을 위한 필수 정보를 몇솔에서 한 번에 확인하세요.'
};

const LogoCarousel = dynamic(() => import('./LogoCarousel'), {
	ssr: false,
	loading: () => <p>로딩 중...</p>
});

export default function Home() {
	const [isSearching, setIsSearching] = useState(false);
	const [isMouseIconActive, setIsMouseIconActive] = useState(true);

	return (
		<div className="h-screen">
			<Script
				id="jsonLd"
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<FullPageScroll isSearching={isSearching}>
				<section className="relative h-full w-full items-center justify-center bg-white">
					<div className="z-0 flex h-full flex-col items-center justify-between">
						<div className="relative flex w-full flex-1 items-center justify-center">
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

											<ClientSearchBox
												onSearchStart={() => setIsSearching(true)}
												onSearchEnd={() => setIsSearching(false)}
												setIconActive={setIsMouseIconActive}
											/>
										</div>
									</Container>
								</FadeIn>
							</div>
						</div>
						<div className="absolute bottom-4 animate-bounce">
							<Image
								className={clsx(
									'transition-opacity duration-500 ease-in-out',
									isMouseIconActive ?   'opacity-100':'pointer-events-none opacity-0'
								)}
								src="/icons/scroll.svg"
								alt="몇솔 스크롤 이미지"
								width={40}
								height={40}
							/>
						</div>
					</div>
				</section>

				<section className="flex h-full w-full flex-col items-center justify-between pt-16">
					<div className="flex flex-1 flex-col items-center justify-center w-full">
						<article className="flex flex-col gap-2 text-center">
							<h2 className="bg-gradient-text-1 bg-clip-text text-lg font-bold text-transparent md:text-2xl">
								이 기업 코딩테스트, 내가 합격할 수 있을까?
							</h2>
							<span className="text-sm text-gray-80 md:text-base">
								몇솔에서 응시 환경부터 합격자 후기까지 한눈에 볼 수 있어요
							</span>
						</article>
						<div className="flex  w-full max-w-[692px] md:max-w-4xl flex-col items-center justify-center gap-8 py-8">
							<LogoCarousel />
							<Link
								className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 font-semibold text-white transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:shadow-md"
								href="/company"
							>
								기업 전체 보기 →
							</Link>
						</div>
					</div>
					<FadeIn>
						<div className="flex flex-col gap-5">
							<h2 className="bg-gradient-text-1 bg-clip-text text-xl font-bold text-transparent md:text-2xl">
								여러분의 후기를 들려주세요!
							</h2>
							<TierGuard render={(checkTier)=><IndexTrLink onClick={checkTier} />} />
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
