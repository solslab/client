'use client';

import { useState, useMemo, useRef } from 'react';
import { DataItem } from '@/app/lib/types/models';
import TierDistributionChart from '@/app/ui/company/TierDistributionChart';
import TrLink from '@/app/ui/company/trLink';
import QuestionText from '@/app/ui/common/QuestionText';
import { IoMdArrowDropdown } from 'react-icons/io';
import ReviewButton from '../datalab/ReviewButton';
import TierGuard from '../common/tierGuard';

type DataLabSectionProps = {
	dataLabDetails: {
		success: number;
		message?: string;
		data?: DataItem[];
		error?: string;
	};
	company_id: string;
};

export default function DataLabSection({ dataLabDetails, company_id }: DataLabSectionProps) {
	const [selectedYear, setSelectedYear] = useState<string>('전체');
	const [selectedCareer, setSelectedCareer] = useState<string>('전체');
	const isDataLoading = dataLabDetails.data;

	const yearSelectRef = useRef<HTMLSelectElement>(null);
	const careerSelectRef = useRef<HTMLSelectElement>(null);

	const filterOptions = useMemo(() => {
		if (!dataLabDetails.data) return { years: [], careers: [] };

		const years = ['전체', ...new Set(dataLabDetails.data.map((item) => item.tr_year))]
			.sort()
			.reverse();
		const careers = ['전체', ...new Set(dataLabDetails.data.map((item) => item.tr_career))];

		return { years, careers };
	}, [dataLabDetails.data]);

	const filteredData = useMemo(() => {
		if (!dataLabDetails.data) return [];

		return dataLabDetails.data.filter((item) => {
			const yearMatch = selectedYear === '전체' || item.tr_year === selectedYear;
			const careerMatch = selectedCareer === '전체' || item.tr_career === selectedCareer;
			return yearMatch && careerMatch;
		});
	}, [dataLabDetails.data, selectedYear, selectedCareer]);

	function calculateTierStats(data: DataItem[]) {
		if (!data || data.length === 0) return null;

		const passedData = data.filter((item) => item.tr_pass_status === '합격');
		if (passedData.length === 0) return null;

		const tiers = passedData.map((item) => item.member_tier);

		const minTier = Math.min(...tiers);
		const maxTier = Math.max(...tiers);

		const convertTierToNumber = (tier: number) => {
			const division = Math.ceil(tier / 5);
			const level = 6 - (tier - (division - 1) * 5);
			return { division, level };
		};

		const convertNumberToTier = (division: number, level: number) => {
			return (division - 1) * 5 + (6 - level);
		};

		const avgTierNum = tiers.reduce((sum, tier) => sum + tier, 0) / tiers.length;
		const avgTierConverted = convertTierToNumber(avgTierNum);
		const avgTier = convertNumberToTier(
			avgTierConverted.division,
			Math.round(avgTierConverted.level)
		);

		return {
			minTier,
			maxTier,
			avgTier,
			mostFrequentRange: calculateMostFrequentRange(tiers),
			totalResponses: data.length,
			passCount: passedData.length
		};
	}

	function calculateMostFrequentRange(tiers: number[]) {
		const ranges: Record<string, number> = {};

		tiers.forEach((tier) => {
			const division = Math.ceil(tier / 5);
			const rangeStart = (division - 1) * 5 + 1;
			const rangeEnd = division * 5;
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

	const tierStats = useMemo(() => calculateTierStats(filteredData), [filteredData]);
	const problemStats = useMemo(() => calculateProblemStats(filteredData), [filteredData]);

	return (
		<div className="mx-auto w-full max-w-5xl rounded-md bg-white p-10">
			{dataLabDetails.success === 404 ? (
				<div className="mt-10 flex min-h-80 w-full flex-col items-center justify-center text-text-base">
					<div className="mb-4 text-center text-base max-sm:text-base">
						이 기업에 작성된 후기가 없어요. 😢
					</div>
					<div className="mb-10 text-center text-base max-sm:text-base">
						여러분의 후기를 공유해주세요!
					</div>
					<TierGuard
						render={(checkTier) => <TrLink onClick={checkTier} />}
						company_id={company_id}
					/>
				</div>
			) : (
				<>
					{dataLabDetails.success !== 403 && (
						<div className="mb-[50px] w-full max-w-md rounded-lg border border-gray-200 px-4 py-2">
							<div className="flex items-center">
								<div className="flex flex-1 flex-col">
									<label className="mb-1 text-sm text-gray-80">응시년도</label>
									<div className="relative w-full">
										<select
											ref={yearSelectRef}
											className="text-md w-full appearance-none bg-transparent text-text-base focus:outline-none"
											value={selectedYear}
											onChange={(e) => setSelectedYear(e.target.value)}
										>
											{filterOptions.years.map((year) => (
												<option key={year} value={year}>
													{year}
												</option>
											))}
										</select>
										<IoMdArrowDropdown
											onClick={(e) => {
												e.stopPropagation();
												yearSelectRef.current?.focus();
											}}
											className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
										/>
									</div>
								</div>
								{/* NOTE 구분선때문에 만든 div */}
								<div className="mx-4 h-12 w-[1px] bg-gray-200" />
								<div className="flex flex-1 flex-col">
									<label className="mb-1 text-sm text-gray-80">채용형태</label>
									<div className="relative w-full">
										<select
											ref={careerSelectRef}
											className="text-md w-full appearance-none bg-transparent text-text-base focus:outline-none"
											value={selectedCareer}
											onChange={(e) => setSelectedCareer(e.target.value)}
										>
											{filterOptions.careers.map((career) => (
												<option key={career} value={career}>
													{career}
												</option>
											))}
										</select>
										<IoMdArrowDropdown
											onClick={(e) => {
												e.stopPropagation();
												careerSelectRef.current?.focus();
											}}
											className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
										/>
									</div>
								</div>
							</div>
						</div>
					)}

					{isDataLoading && filteredData.length === 0 ? (
						<div className="flex min-h-[400px] w-full items-center justify-center text-gray-80">
							조건과 일치하는 데이터가 없습니다.
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
								<div className="flex w-full flex-col items-center gap-5 sm:flex-row">
									<div className="flex h-[210px] w-full items-center justify-center rounded-[10px] border-[1px] border-gray-40 sm:w-2/3">
										{dataLabDetails.success === 403 ? (
											<TierGuard
												render={(checkTier) => <ReviewButton onClick={checkTier} />}
												company_id={company_id}
											/>
										) : (
											<TierDistributionChart
												data={filteredData.filter((item) => item.tr_pass_status === '합격')}
											/>
										)}
									</div>
									<div className="grid h-[210px] w-full grid-cols-2 gap-5 p-5 sm:w-1/3">
										<div className="flex-shrink-0 whitespace-nowrap text-left font-bold text-text-base">
											합격자 / 응답자 수
										</div>
										<div className="text-left text-text-base">
											{tierStats
												? `${tierStats.passCount}명 / ${tierStats.totalResponses}명`
												: '??명 / ??명'}
										</div>
										<div className="whitespace-nowrap text-left font-bold text-text-base">
											합격자 평균 티어
										</div>
										<div className="text-left">
											<QuestionText type="tier" value={tierStats?.avgTier} />
										</div>
										<div className="whitespace-nowrap text-left font-bold text-text-base">
											최저 합격자 티어
										</div>
										<div className="text-left">
											<QuestionText type="tier" value={tierStats?.minTier} />
										</div>
										<div className="whitespace-nowrap text-left font-bold text-text-base">
											최고 합격자 티어
										</div>
										<div className="text-left">
											<QuestionText type="tier" value={tierStats?.maxTier} />
										</div>
									</div>
								</div>
								<span className="px-2 text-xs text-gray-70">
									위 정보는{' '}
									<a target="_blank" href={'https://solved.ac/'} className="font-bold underline">
										solved.ac
									</a>
									(솔브드)의 유저 티어 시스템을 기반으로 제공됩니다.
								</span>
							</div>

							<div className="flex w-full flex-col items-center gap-5 rounded-sm py-10 pt-0 lg:flex-row">
								<div className="flex w-full flex-col gap-[10px] lg:w-2/3">
									<h1 className="text-lg font-bold text-text-base">평균 합격자 문제 해결 수</h1>

									<div className="flex h-[210px] flex-col items-center justify-center gap-2 rounded-[10px] border-[1px] border-gray-40">
										{dataLabDetails.success === 403 ? (
											<TierGuard
												render={(checkTier) => <ReviewButton onClick={checkTier} />}
												company_id={company_id}
											/>
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
															<span className="font-bold text-main-base">?문제</span>를 해결했습니다
														</>
													)}
												</div>
											</div>
										)}
									</div>
								</div>

								<div className="flex w-full flex-col gap-[10px] lg:w-1/3">
									<h1 className="text-lg font-bold text-text-base">모든 응답</h1>
									<div className="flex h-[210px] flex-col items-stretch justify-start gap-5 overflow-scroll rounded-[10px] border-[1px] border-gray-40 p-5 px-6 scrollbar-hide">
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
															총 {item.tr_problem_num}문제 / {item.tr_solved_num}솔
														</h4>
														{/* <span className="text-gray-80">[{item.tr_year}]</span> */}
													</div>
												))
											: Array.from({ length: 7 }, (_, idx) => (
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
														<h4 className="flex-shrink-0 whitespace-nowrap font-bold text-text-base">
															총 ?문제 / ?솔
														</h4>
														{/* <span className="text-gray-80">[2024]</span> */}
													</div>
												))}
									</div>
								</div>
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
}
