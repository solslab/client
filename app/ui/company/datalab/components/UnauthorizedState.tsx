import TierDistributionChart from '@/app/ui/company/TierDistributionChart';
import ReviewButton from '@/app/ui/company/datalab/ReviewButton';
import TierGuard from '@/app/ui/common/tierGuard';
import QuestionText from '@/app/ui/common/QuestionText';
import { DataItem } from '@/app/lib/types/models';

type UnauthorizedStateProps = {
	company_id: string;
	filteredData: DataItem[];
	tierStats: any;
	problemStats: any;
};

export default function UnauthorizedState({ 
	company_id, 
	filteredData, 
	tierStats, 
	problemStats 
}: UnauthorizedStateProps) {
	return (
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
						<TierGuard
							render={(checkTier) => <ReviewButton onClick={checkTier} />}
							company_id={company_id}
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
						<TierGuard
							render={(checkTier) => <ReviewButton onClick={checkTier} />}
							company_id={company_id}
						/>
					</div>
				</div>

				<div className="flex w-full flex-col gap-[10px] lg:w-1/3">
					<h1 className="text-lg font-bold text-text-base">모든 응답</h1>
					<div className="flex h-[210px] flex-col items-stretch justify-start gap-5 overflow-scroll rounded-[10px] border-[1px] border-gray-40 p-5 px-6 scrollbar-hide">
						{Array.from({ length: 7 }, (_, idx) => (
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
	);
} 