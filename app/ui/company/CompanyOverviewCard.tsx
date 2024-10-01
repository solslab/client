import { CompanyOverviewData } from '@/app/lib/definitions';
import Image from 'next/image';

export function CompanyOverviewCard({ companyData }: { companyData: CompanyOverviewData }) {
	return (
		<div className="flex w-full flex-row items-center justify-between rounded-[10px] border-[1px] border-gray-50 p-[10px] text-[14px] md:p-5">
			<div className="flex items-center gap-[14px]">
				<Image
					src={companyData.company_logo}
					alt={companyData.company_name}
					width={50}
					height={50}
					className="rounded-[10px]"
				/>
				<h2>{companyData.company_name}</h2>
			</div>
			<h2 className="text-gray-80">{companyData.company_name}</h2>
		</div>
	);
}
