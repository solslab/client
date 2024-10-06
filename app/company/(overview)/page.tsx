import { fetchCompanyData } from '@/app/lib/data';
import Container from '@/app/ui/container';
import { CompanyOverviewCard } from '@/app/ui/company/CompanyOverviewCard';
import { BsThreeDots } from 'react-icons/bs';
import { PaginationButtons } from '@/app/ui/paging/Pagination';

const PAGE_SIZE = 2;

export default async function Page({
	searchParams
}: {
	searchParams: {
		page?: string;
	};
}) {
	const currentPage = Number(searchParams.page) || 1;

	const companyData = await fetchCompanyData(currentPage, PAGE_SIZE);

	if (!companyData) {
		return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
	}

	const { companies, total_pages: totalPages } = companyData;

	let pageNumbers: (number | JSX.Element)[] = [];

	if (totalPages <= 3) {
		pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
	} else {
		if (currentPage <= 2) {
			pageNumbers = [1, 2, 3, <BsThreeDots key="end-ellipsis" />];
		} else if (currentPage >= totalPages - 1) {
			pageNumbers = [
				<BsThreeDots key="start-ellipsis" />,
				totalPages - 2,
				totalPages - 1,
				totalPages
			];
		} else {
			pageNumbers = [
				<BsThreeDots key="start-ellipsis" />,
				currentPage - 1,
				currentPage,
				currentPage + 1,
				<BsThreeDots key="end-ellipsis" />
			];
		}
	}

	return (
		<Container>
			<div className="flex flex-col gap-[10px] py-5 md:gap-5">
				{companies.map((company) => (
					<CompanyOverviewCard key={company.company_id} companyData={company} />
				))}
			</div>
			<PaginationButtons
				currentPage={currentPage}
				totalPages={totalPages}
				pageNumbers={pageNumbers}
			/>
		</Container>
	);
}
