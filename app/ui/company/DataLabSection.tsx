'use client';

import { useState, useMemo } from 'react';
import { DataItem } from '@/app/lib/definitions';
import TierDistributionChart from '@/app/ui/company/TierDistributionChart';
import TrLink from '@/app/ui/company/trLink';
import QuestionText from '@/app/ui/QuestionText';
import Link from 'next/link';

type DataLabSectionProps = {
	dataLabDetails: {
		success: number;
		data: DataItem[];
	};
	company_id: string;
};

export default function DataLabSection({ dataLabDetails, company_id }: DataLabSectionProps) {
	const [selectedYear, setSelectedYear] = useState<string>('전체');
	const [selectedCareer, setSelectedCareer] = useState<string>('전체');

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
					<div className="mb-4 text-center text-xl">오픈 준비중!</div>
					<div className="mb-10 text-center text-xl">정보 제공을 위해 후기를 모으고 있어요.</div>
					<TrLink company_id={company_id} />
				</div>
			) : (
				<>
					{dataLabDetails.success !== 403 && (
						<div className="mb-8 flex flex-wrap gap-4">
							<div className="flex items-center gap-2">
								<label className="text-sm font-medium text-gray-70">연도:</label>
								<select
									className="rounded-md border border-gray-40 px-3 py-2 text-sm"
									value={selectedYear}
									onChange={(e) => setSelectedYear(e.target.value)}
								>
									{filterOptions.years.map((year) => (
										<option key={year} value={year}>
											{year}
										</option>
									))}
								</select>
							</div>
							<div className="flex items-center gap-2">
								<label className="text-sm font-medium text-gray-70">경력:</label>
								<select
									className="rounded-md border border-gray-40 px-3 py-2 text-sm"
									value={selectedCareer}
									onChange={(e) => setSelectedCareer(e.target.value)}
								>
									{filterOptions.careers.map((career) => (
										<option key={career} value={career}>
											{career}
										</option>
									))}
								</select>
							</div>
						</div>
					)}

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
									<TierDistributionChart
										data={filteredData.filter((item) => item.tr_pass_status === '합격')}
									/>
								)}
							</div>
							<div className="grid h-[210px] w-full grid-cols-2 gap-5 p-5 lg:w-1/3">
								<div className="flex-shrink-0 whitespace-nowrap text-left font-bold text-text-base">
									합격자/응답자 수
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
													<span className="font-bold text-main-base">{tierStats.passCount}명</span>
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
													<span className="font-bold text-main-base">???명</span>의 합격자가 평균{' '}
													<span className="font-bold text-main-base">?문제</span> 중{' '}
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
												<h4 className="flex-shrink-0 whitespace-nowrap font-bold">?솔/?문제</h4>
												<span className="text-gray-80">[2024]</span>
											</div>
										))}
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
