'use client';

import { useState, useMemo } from 'react';
import { DataItem } from '@/app/lib/types/models';
import { EmptyState, UnauthorizedState, AuthorizedState } from '@/app/ui/company/datalab/components';
import CenterLoginOverlay from '@/app/ui/company/datalab/components/CenterLoginOverlay';

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
		<div className="relative mx-auto w-full max-w-5xl rounded-md bg-white p-10">
			{dataLabDetails.success === 404 ? (
				<EmptyState company_id={company_id} />
			) : dataLabDetails.success === 403 ? (
				<>
					<UnauthorizedState
						tierStats={tierStats}
						company_id={company_id}
					/>
					<CenterLoginOverlay company_id={company_id} />
				</>
			) : (
				<AuthorizedState
					company_id={company_id}
					dataLabDetails={dataLabDetails}
					filteredData={filteredData}
					tierStats={tierStats}
					problemStats={problemStats}
					selectedYear={selectedYear}
					setSelectedYear={setSelectedYear}
					selectedCareer={selectedCareer}
					setSelectedCareer={setSelectedCareer}
					filterOptions={filterOptions}
				/>
			)}
		</div>
	);
} 