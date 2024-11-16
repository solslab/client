import { fetchCompanyDetail, fetchDatalabData, fetchPositionData } from '@/app/lib/data';
import { Company, DataItem, Position, TestData } from '@/app/lib/definitions';
import SectionButton from '@/app/ui/company/sectionButton';
import TestInfo from '@/app/ui/company/testInfo';
import TierDistributionChart from '@/app/ui/company/TierDistributionChart';
import TrLink from '@/app/ui/company/trLink';
import Container from '@/app/ui/container';
import QuestionSpan from '@/app/ui/datalab/QuestionSpan';
import FeedBackBtn from '@/app/ui/feedBackBtn';
import QuestionText from '@/app/ui/QuestionText';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
const menuList = [
	{
		label: '코딩테스트 정보 ',
		section: 'companyInfo',
		metaTitle: '코딩테스트 정보 - 지원 언어, 시험 방식, 응시 후기 모음 | 몇솔'
	},
	{
		label: '데이터랩',
		section: 'dataLab',
		metaTitle: '데이터랩'
	}
];
export async function generateMetadata({
	params,
	searchParams
}: {
	params: { id: string };
	searchParams: { section?: string; position?: string };
}): Promise<Metadata> {
	const company_id = params.id;
	const companyData: Company | undefined = await fetchCompanyDetail(company_id);
	const section = searchParams.section || menuList[0].section;
	let sectionLabel: string = '코딩테스트 정보 - 지원 언어, 시험 방식, 응시 후기 모음 | 몇솔';
	for (let menu of menuList) {
		if (menu.section == section) {
			sectionLabel = menu.metaTitle;
			break;
		}
	}
	const companyName = companyData ? companyData?.company_name : '';
	const metaTitle = companyData
		? `${companyData && companyData.company_name} ${sectionLabel}`
		: '몇솔';
	const metaDesc = `${companyName} 코딩테스트 준비에 필요한 모든 정보 및 후기를 몇솔에서 무료로 확인하세요.`;
	const metaKeyword = `${companyName} 코딩테스트, ${companyName} 채용, ${companyName} 코딩 언어, ${companyName} 코딩테스트 후기, 개발자 취업 준비, 몇솔, 시험시간, 문제수, IDE사용, 구글링, 히든 테스트케이스, 시험방식, 응시장소, 플랫폼, 합격컷, 합격기준, 수준, 난이도`;

	return {
		title: metaTitle,
		description: metaDesc,
		keywords: metaKeyword,
		openGraph: {
			title: metaTitle,
			description: metaDesc,
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
}

export default async function Page({
	params,
	searchParams
}: {
	params: { id: string };
	searchParams: { section?: string; position?: string };
}) {
	const company_id = params.id;
	const section = searchParams.section || menuList[0].section;
	const companyData: Company | undefined = await fetchCompanyDetail(company_id);
	if (!companyData) {
		notFound();
	}
	const positions: Position[] = companyData.positions;
	const position_id = searchParams.position || positions[0]?.position_id;
	if (!position_id) {
		notFound();
	}
	const data: TestData = await fetchPositionData(position_id);
	const dataLabDetails = await fetchDatalabData(company_id);

	function calculateTierStats(data: DataItem[]) {
		if (!data || data.length === 0) return null;

		const passedData = data.filter((item) => item.tr_pass_status === '합격');
		if (passedData.length === 0) return null;

		const tiers = passedData.map((item) => item.member_tier);

		return {
			minTier: Math.min(...tiers),
			maxTier: Math.max(...tiers),
			avgTier: Math.round(tiers.reduce((sum, tier) => sum + tier, 0) / tiers.length),
			mostFrequentRange: calculateMostFrequentRange(tiers),
			totalResponses: data.length,
			passCount: passedData.length
		};
	}

	function calculateMostFrequentRange(tiers: number[]) {
		const ranges: Record<string, number> = {};

		tiers.forEach((tier) => {
			const rangeStart = Math.floor((tier - 1) / 3) * 3 + 1;
			const rangeEnd = rangeStart + 2;
			const range = `${rangeStart}-${rangeEnd}`;

			ranges[range] = (ranges[range] || 0) + 1;
		});

		const mostFrequent = Object.entries(ranges)
			.sort((a, b) => b[1] - a[1])[0][0]
			.split('-')
			.map(Number);

		return {
			start: mostFrequent[0],
			end: mostFrequent[1]
		};
	}

	const tierStats = dataLabDetails.data ? calculateTierStats(dataLabDetails.data) : null;

	function calculateProblemStats(data: DataItem[]) {
		if (!data || data.length === 0) return null;

		const passedData = data.filter((item) => item.tr_pass_status === '합격');
		if (passedData.length === 0) return null;

		const avgSolved = Math.round(
			passedData.reduce((sum, item) => sum + item.tr_solved_num, 0) / passedData.length
		);

		const avgTotal = Math.round(
			passedData.reduce((sum, item) => sum + item.tr_problem_num, 0) / passedData.length
		);

		return {
			avgSolved,
			avgTotal
		};
	}

	const problemStats = dataLabDetails.data ? calculateProblemStats(dataLabDetails.data) : null;

	return (
		<>
			<div className="relative h-32 w-full bg-[url('/company_sm.png')] bg-cover bg-center sm:bg-[url('/company_30.png')] md:h-64 lg:h-64"></div>
			<div className="relative flex flex-col items-center justify-center border-b border-t border-gray-30 border-t-gray-30 bg-bg-base py-10 md:py-16">
				<Container>
					<div
						className="absolute top-[-1.375rem] h-16 w-16 rounded-xl border border-gray-30 bg-cover bg-center bg-no-repeat md:top-[-3rem] md:h-24 md:w-24"
						style={{ backgroundImage: ` url(${companyData.company_logo})` }}
					/>
					<div className="flex flex-row items-center font-bold text-title-black">
						<div className="pt-[0.625rem] text-xl md:pt-0 md:text-2xl">
							{companyData.company_name}
						</div>
					</div>
				</Container>
			</div>
			<div className="flex flex-col items-center justify-between border-b border-gray-30 bg-bg-base">
				<Container className={'px-0'}>
					<div className="flex h-12 w-full">
						{menuList.map((menu) => (
							<SectionButton key={menu.label + menu.section} menu={menu}></SectionButton>
						))}
					</div>
				</Container>
			</div>
			<div className="md:my-12">
				{section == menuList[0].section ? (
					<>
						<TestInfo positions={positions} position_id={position_id} data={data} />
						<Container>
							<div className="flex w-full flex-wrap justify-between py-7 text-gray-70">
								<div className="mb-8 flex w-full flex-col justify-center text-sm md:mb-0 md:w-1/2">
									위 정보는 응시자의 설문을 바탕으로 제공되며, <br />
									채용 프로세스 변경 또는 지원 직무에 따라 일부 정보가 다를 수 있습니다.
									<div className="flex">
										<div className="mr-1 flex items-center justify-center">
											<Image src={'/icons/verifyIcon.png'} width={16} height={16} alt="verifyed" />
										</div>
										가 없는 정보의 경우, 실제 시험 응시 전 재확인을 권장드립니다.
									</div>
								</div>
								<div className="flex w-full justify-end md:w-1/2">
									<div className="flex w-full justify-between md:w-auto md:flex-col md:justify-center">
										<div className="sm:text-70 my-auto text-center text-sm text-gray-90 md:mb-2 md:text-gray-70">
											잘못된 정보가 있나요?
										</div>
										<Link
											href={`/company/${company_id}/suggestion?position=${position_id}`}
											className="w-36 rounded-md bg-main-light px-6 py-3 text-center text-main-base"
										>
											정보 수정 요청
										</Link>
									</div>
								</div>
							</div>
						</Container>
					</>
				) : (
					<div className="mx-auto w-full max-w-5xl rounded-md bg-white p-10">
						{dataLabDetails.success === 404 ? (
							<div className="mt-10 flex min-h-80 w-full flex-col items-center justify-center text-text-base">
								<div className="mb-4 text-center text-xl">오픈 준비중!</div>
								<div className="mb-10 text-center text-xl">
									정보 제공을 위해 후기를 모으고 있어요.
								</div>
								<TrLink company_id={company_id} />
							</div>
						) : (
							<>
								<div className="flex w-full flex-col gap-[10px] rounded-sm py-10 pt-0">
									<h1 className="text-lg font-bold text-text-base">합격자 티어 분포</h1>
									<div className="flex items-center gap-2 py-3">
										<QuestionText type="tier" value={tierStats?.mostFrequentRange.start} />
										~
										<QuestionText type="tier" value={tierStats?.mostFrequentRange.end} />
										<span className="text-xs text-text-base md:text-[14px]">
											사이의 지원자가 많이 합격했어요!
										</span>
									</div>
									<div className="flex w-full flex-col items-center gap-5 lg:flex-row">
										<div className="flex h-[210px] w-full items-center justify-center rounded-[10px] border-[1px] border-gray-40 lg:w-2/3">
											{dataLabDetails.success === 403 ? (
												<button className="rounded-[10px] border-[2px] border-main-base px-7 py-4 font-bold text-main-base">
													코딩테스트 후기 작성하고 모든 정보 열람하기!
												</button>
											) : (
												<TierDistributionChart data={dataLabDetails.data || []} />
											)}
										</div>
										<div className="grid h-[210px] w-full grid-cols-2 gap-5 p-5 lg:w-1/3">
											<div className="flex-shrink-0 whitespace-nowrap text-left font-bold">
												합격자/응답자 수
											</div>
											<div className="text-left">
												{tierStats
													? `${tierStats.passCount}명 / ${tierStats.totalResponses}명`
													: '??명 / ??명'}
											</div>
											<div className="whitespace-nowrap text-left font-bold">합격자 평균 티어</div>
											<div className="text-left">
												<QuestionText type="tier" value={tierStats?.avgTier} />
											</div>
											<div className="whitespace-nowrap text-left font-bold">최저 합격자 티어</div>
											<div className="text-left">
												<QuestionText type="tier" value={tierStats?.minTier} />
											</div>
											<div className="whitespace-nowrap text-left font-bold">최고 합격자 티어</div>
											<div className="text-left">
												<QuestionText type="tier" value={tierStats?.maxTier} />
											</div>
										</div>
									</div>
									<span className="px-2 text-xs text-gray-70">
										위 정보는 <span className="font-bold underline">solved.ac</span>
										(솔브드)의 유저 티어 시스템을 기반으로 제공됩니다.
									</span>
								</div>

								<div className="flex w-full flex-col items-center gap-5 rounded-sm py-10 pt-0 lg:flex-row">
									<div className="flex w-full flex-col gap-[10px] lg:w-2/3">
										<h1 className="text-lg font-bold text-text-base">평균 합격자 문제 해결 수</h1>

										<div className="flex h-[210px] flex-col items-center justify-center gap-2 rounded-[10px] border-[1px] border-gray-40">
											{dataLabDetails.success === 403 ? (
												<button className="rounded-[10px] border-[2px] border-main-base px-7 py-4 font-bold text-main-base">
													코딩테스트 후기 작성하고 모든 정보 열람하기!
												</button>
											) : (
												<div className="flex w-3/4 flex-col items-center gap-8">
													<div className="relative h-[3px] w-full rounded-full bg-main-light md:h-[6px]">
														<div className="absolute bottom-[12px] left-1/2 -translate-x-1/2 text-xs md:bottom-[16px]">
															<div className="absolute left-1/2 top-[15px] h-[11px] w-[2px] -translate-x-1/2 bg-main-base"></div>
															{problemStats ? `${problemStats.avgSolved}문제` : '???'}
														</div>
														<div className="absolute bottom-[12px] right-[10%] text-xs md:bottom-[16px]">
															<div className="absolute left-1/2 top-[15px] h-[11px] w-[2px] -translate-x-1/2 bg-main-base"></div>
															{problemStats ? `${problemStats.avgTotal}문제` : '???'}
														</div>
													</div>
													<div className="text-center text-xs text-gray-90 md:text-sm">
														{tierStats && problemStats ? (
															<>
																<span className="font-bold text-main-base">
																	{tierStats.passCount}명
																</span>
																의 합격자가 평균{' '}
																<span className="font-bold text-main-base">
																	{problemStats.avgTotal}문제
																</span>{' '}
																중{' '}
																<span className="font-bold text-main-base">
																	{problemStats.avgSolved}문제
																</span>
																를 해결했습니다
															</>
														) : (
															<>
																<span className="font-bold text-main-base">???명</span>의 합격자가
																평균 <span className="font-bold text-main-base">?문제</span> 중{' '}
																<span className="font-bold text-main-base">?문제</span>를
																해결했습니다
															</>
														)}
													</div>
												</div>
											)}
										</div>
									</div>

									<div className="flex w-full flex-col gap-[10px] lg:w-1/3">
										<h1 className="text-lg font-bold text-text-base">모든 응답</h1>
										<div className="flex h-[210px] flex-col items-stretch justify-start gap-5 overflow-scroll rounded-[10px] border-[1px] border-text-base p-5 px-6 scrollbar-hide">
											{dataLabDetails.data
												? dataLabDetails.data.map((item, idx) => (
														<div key={idx} className="flex items-center justify-between gap-3">
															{item.tr_pass_status === '합격' ? (
																<span className="w-[60px] rounded-[10px] bg-main-base px-2 py-1 text-center text-sm font-bold text-white">
																	합격
																</span>
															) : (
																<span className="w-[60px] rounded-[10px] bg-gray-80 px-2 py-1 text-center text-sm font-bold text-white">
																	불합격
																</span>
															)}
															<h4 className="flex-shrink-0 whitespace-nowrap font-bold text-gray-80">
																{item.tr_solved_num}솔/{item.tr_problem_num}문제
															</h4>
															<span className="text-gray-80">[{item.tr_year}]</span>
														</div>
													))
												: // 데이터가 없을 경우 기존 더미 데이터 표시
													Array.from({ length: 7 }, (_, idx) => (
														<div key={idx} className="flex items-center justify-between gap-3">
															{idx % 2 === 0 ? (
																<span className="w-[60px] rounded-[10px] bg-main-base px-2 py-1 text-center text-sm font-bold text-white">
																	합격
																</span>
															) : (
																<span className="w-[60px] rounded-[10px] bg-text-base px-2 py-1 text-center text-sm font-bold text-white">
																	불합격
																</span>
															)}
															<h4 className="flex-shrink-0 whitespace-nowrap font-bold">
																?솔/?문제
															</h4>
															<span className="text-gray-80">[2024]</span>
														</div>
													))}
										</div>
									</div>
								</div>
							</>
						)}
					</div>
				)}
			</div>
			<FeedBackBtn />
		</>
	);
}
