import CompanyMenu from '@/app/ui/company/CompanyMenu';
import DataLabSection from '@/app/ui/company/DataLabSection';
import Container from '@/app/ui/common/container';
import FeedBackBtn from '@/app/ui/common/feedBackBtn';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchCompanyDetail } from '@/app/lib/server/queries/company/index';
import { Company } from '@/app/lib/types/models';
import { fetchDatalabData } from '@/app/lib/server/queries/datalab';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
	const company_id = params.id;
	const companyData: Company | undefined = await fetchCompanyDetail(company_id);
	const companyName = companyData ? companyData.company_name : '';
	const metaTitle = companyData
		? `${companyData.company_name} 코딩테스트 합격자 분석 | 몇솔`
		: '몇솔';
	const metaDesc = `${companyName} 코딩테스트 합격자들의 solved.ac 티어는? 통계를 확인해보세요!`;
	const metaKeyword = `
		${companyName} 코딩테스트, ${companyName} 코테, ${companyName} 합격컷, ${companyName} 합격자 정보, 
		${companyName} 코딩테스트 난이도, ${companyName} 코테 난이도, ${companyName} 몇솔, ${companyName} 몇 문제, 
		${companyName} 코딩테스트 분석, ${companyName} 코딩테스트 점수, ${companyName} 코딩테스트 후기, 
		${companyName} 알고리즘 테스트, ${companyName} 프로그래밍 테스트, ${companyName} 개발자 테스트, 
		${companyName} 취업 코딩테스트, ${companyName} 기업 코딩테스트, ${companyName} 코딩테스트 준비, 
		${companyName} 코테 준비, ${companyName} 코딩테스트 문제 풀이, ${companyName} 알고리즘 문제, 
		${companyName} 코딩 문제, ${companyName} 실력 측정, ${companyName} 코딩테스트 통계, 
		${companyName} 합격자 점수, ${companyName} 코딩테스트 난이도, ${companyName} 코테 난이도, 
		${companyName} 백준, ${companyName} 코딩테스트 통과, ${companyName} 코테 통과, ${companyName} 코딩테스트 합격 ${companyName} 코테 합격, ${companyName} 코테 불합격, ${companyName} 코테 불합격, 
		${companyName} 코테 탈락, ${companyName} 코테 수준, ${companyName} 코딩테스트 수준, ${companyName} 공채, ${companyName} 코테 느낌, ${companyName} 코테 시간초과,

		코딩테스트, 코테, 합격컷, 합격자 정보, 코딩테스트 난이도, 코테 난이도, 코테 몇솔, 몇 문제, 몇솔, 합격커트,
		코딩테스트 분석, 코딩테스트 점수, 코딩테스트 후기, 알고리즘 테스트, 프로그래밍 테스트, 
		개발자 테스트, 취업 코딩테스트, 기업 코딩테스트, 코딩테스트 준비, 코테 준비, 코테 문제 풀이, 
		알고리즘 문제, 코딩테스트 문제, 후기, 코테 실력, 코딩테스트 통계, 합격자 점수, 난이도 평가, 난이도 분석, 
		백준, 코딩테스트 통과, 코딩테스트 합격, 코딩테스트 불합격, 탈락, 코딩테스트 수준, 공채, 코딩테스트 느낌, 코테 시간초과
	`;

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
						style={{
							backgroundImage: companyData.company_logo
								? `url(${companyData.company_logo})`
								: 'url(/companyLogo/default_company_logo.png)',
							backgroundColor: '#F0F1F2'
						}}
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
