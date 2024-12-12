import { CompanyOverviewData } from '@/app/lib/definitions';
import Image from 'next/image';
import Link from 'next/link';

export function CompanyOverviewCard({ companyData }: { companyData: CompanyOverviewData }) {
	return (
		<Link
			href={`/company/${companyData.company_id}`}
			className="hover-effect flex w-full flex-col gap-4 rounded-[10px] border-[1px] border-gray-50 p-[10px] text-sm md:gap-5 md:p-5"
		>
			<div className="flex items-center gap-[14px]">
				<Image
					src={companyData.company_logo?companyData.company_logo:'/companyLogo/default_company_logo.png'}
					alt={companyData.company_name}
					width={50}
					height={50}
					className="rounded-[10px] border-[1px] border-gray-50"
				/>
				<h2>{companyData.company_name}</h2>
			</div>
			<div className="flex flex-row gap-2">
				{companyData.industry_type.map((industry) => (
					<div
						className="rounded-xl border-[1px] border-gray-50 bg-white px-3 py-1 text-xs text-text-base"
						key={industry}
					>
						{industry}
					</div>
				))}
			</div>
		</Link>
	);
}
