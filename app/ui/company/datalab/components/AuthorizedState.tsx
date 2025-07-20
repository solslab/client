import TierDistributionChart from '@/app/ui/company/TierDistributionChart';
import QuestionText from '@/app/ui/common/QuestionText';
import { FilterSection } from '@/app/ui/company/datalab/components';
import { DataItem } from '@/app/lib/types/models';

type AuthorizedStateProps = {
	company_id: string;
	dataLabDetails: {
		success: number;
		message?: string;
		data?: DataItem[];
		error?: string;
	};
	filteredData: DataItem[];
	tierStats: any;
	problemStats: any;
	selectedYear: string;
	setSelectedYear: (year: string) => void;
	selectedCareer: string;
	setSelectedCareer: (career: string) => void;
	filterOptions: {
		years: string[];
		careers: string[];
	};
};

export default function AuthorizedState({
	company_id,
	dataLabDetails,
	filteredData,
	tierStats,
	problemStats,
	selectedYear,
	setSelectedYear,
	selectedCareer,
	setSelectedCareer,
	filterOptions
}: AuthorizedStateProps) {
	const isDataLoading = dataLabDetails.data;

	return (
		<>
			<FilterSection
				selectedYear={selectedYear}
				setSelectedYear={setSelectedYear}
				selectedCareer={selectedCareer}
				setSelectedCareer={setSelectedCareer}
				filterOptions={filterOptions}
			/>

			{isDataLoading && (filteredData.length === 0 || tierStats === null) ? (
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
								<TierDistributionChart
									data={filteredData.filter((item) => item.tr_pass_status === '합격')}
								/>
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
											</div>
										))}
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
} 