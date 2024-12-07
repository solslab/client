'use client';

import { useState } from 'react';

interface FilterSelectProps {
	years: string[];
	careers: string[];
	onFilterChange: (year: string, career: string) => void;
}

export default function FilterSelect({ years, careers, onFilterChange }: FilterSelectProps) {
	const [selectedYear, setSelectedYear] = useState<string>('전체');
	const [selectedCareer, setSelectedCareer] = useState<string>('전체');

	const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newYear = e.target.value;
		setSelectedYear(newYear);
		onFilterChange(newYear, selectedCareer);
	};

	const handleCareerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newCareer = e.target.value;
		setSelectedCareer(newCareer);
		onFilterChange(selectedYear, newCareer);
	};

	return (
		<div className="mb-8 flex flex-wrap gap-4">
			<div className="flex items-center gap-2">
				<label className="text-sm font-medium text-gray-70">연도:</label>
				<select
					className="rounded-md border border-gray-40 px-3 py-2 text-sm"
					value={selectedYear}
					onChange={handleYearChange}
				>
					{years.map((year) => (
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
					onChange={handleCareerChange}
				>
					{careers.map((career) => (
						<option key={career} value={career}>
							{career}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}
