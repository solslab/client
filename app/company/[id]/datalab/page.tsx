import { fetchCompanyDetail, fetchDatalabData } from '@/app/lib/data';
import { Company } from '@/app/lib/definitions';
import CompanyMenu from '@/app/ui/company/CompanyMenu';
import DataLabSection from '@/app/ui/company/DataLabSection';
import Container from '@/app/ui/container';
import FeedBackBtn from '@/app/ui/feedBackBtn';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
	const company_id = params.id;
	const companyData: Company | undefined = await fetchCompanyDetail(company_id);
	const companyName = companyData ? companyData.company_name : '';
	const metaTitle = companyData ? `${companyData.company_name} 데이터랩` : '몇솔';
	const metaDesc = `${companyName} 데이터랩 정보를 몇솔에서 무료로 확인하세요.`;
	const metaKeyword = `${companyName} 데이터랩, 개발자 취업 준비, 몇솔`;

	return {
		title: metaTitle,
		description: metaDesc,
		keywords: metaKeyword,
		openGraph: {
			title: metaTitle,
			description: metaDesc,
			images: [
				{
					url: 'https://sols.kr/og.png',
					width: 1200,
					height: 628,
					alt: 'openGraph Image'
				}
			]
		}
	};
}

export default async function DataLabPage({ params }: { params: { id: string } }) {
	const company_id = params.id;
	const companyData: Company | undefined = await fetchCompanyDetail(company_id);
	if (!companyData) {
		notFound();
	}
	const dataLabDetails = await fetchDatalabData(company_id);

	return (
		<>
			<div className="relative h-32 w-full bg-[url('/company_sm.png')] bg-cover bg-center sm:bg-[url('/company_30.png')] md:h-64 lg:h-64"></div>
			<div className="relative flex flex-col items-center justify-center border-b border-t border-gray-30 bg-bg-base py-10 md:py-16">
				<Container>
					<div
						className="absolute top-[-1.375rem] h-16 w-16 rounded-xl border border-gray-30 bg-cover bg-center bg-no-repeat md:top-[-3rem] md:h-24 md:w-24"
						style={{ backgroundImage: `url(${companyData.company_logo})` }}
					/>
					<div className="flex flex-row items-center font-bold text-title-black">
						<div className="pt-[0.625rem] text-xl md:pt-0 md:text-2xl">
							{companyData.company_name}
						</div>
					</div>
				</Container>
			</div>
			<div className="flex flex-col items-center justify-between border-b border-gray-30 bg-bg-base">
				<Container className={'px-0'}>
					<CompanyMenu company_id={company_id} currentPage="datalab" />
				</Container>
			</div>
			<div className="md:my-12">
				<DataLabSection dataLabDetails={dataLabDetails} company_id={company_id} />
			</div>
			<FeedBackBtn />
		</>
	);
}
