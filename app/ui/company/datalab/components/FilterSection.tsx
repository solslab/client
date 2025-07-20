'use client';

import { useRef } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';

type FilterSectionProps = {
	selectedYear: string;
	setSelectedYear: (year: string) => void;
	selectedCareer: string;
	setSelectedCareer: (career: string) => void;
	filterOptions: {
		years: string[];
		careers: string[];
	};
};

export default function FilterSection({
	selectedYear,
	setSelectedYear,
	selectedCareer,
	setSelectedCareer,
	filterOptions
}: FilterSectionProps) {
	const yearSelectRef = useRef<HTMLSelectElement>(null);
	const careerSelectRef = useRef<HTMLSelectElement>(null);

	return (
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
	);
} 