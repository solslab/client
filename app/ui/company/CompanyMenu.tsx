import Link from 'next/link';

interface CompanyMenuProps {
	company_id: string;
	currentPage: 'testInfo' | 'datalab';
}

export default function CompanyMenu({ company_id, currentPage }: CompanyMenuProps) {
	const menuItems = [
		{
			label: '코딩테스트 정보',
			href: `/company/${company_id}`,
			isActive: currentPage === 'testInfo'
		},
		{
			label: '데이터랩',
			href: `/company/${company_id}/datalab`,
			isActive: currentPage === 'datalab'
		}
	];

	return (
		<div className="flex h-12 w-full">
			{menuItems.map((item) => (
				<Link
					key={item.label}
					href={item.href}
					className={`flex items-center justify-center px-4 ${
						item.isActive ? 'border-b-2 border-main-base font-bold text-main-base' : 'text-gray-500'
					}`}
				>
					{item.label}
				</Link>
			))}
		</div>
	);
}
