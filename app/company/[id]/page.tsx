import { fetchCompanyDetail, fetchPositionData } from '@/app/lib/data';
import { Company, Position, TestData } from '@/app/lib/definitions';
import SectionButton from '@/app/ui/company/sectionButton';
import TestInfo from '@/app/ui/company/testInfo';
import TrLink from '@/app/ui/company/trLink';
import Container from '@/app/ui/container';
import FeedBackBtn from '@/app/ui/feedBackBtn';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
const menuList = [
	{
		label: '코딩테스트 정보 ',
		section: 'companyInfo',
		metaTitle: '코딩테스트 정보 - 지원 언어, 시험 방식, 응시 후기 모음 | 몇솔'
	},
	{
		label: '데이터랩',
		section: 'dataLab',
		metaTitle: '데이터랩'
	}
];
export async function generateMetadata({
	params,
	searchParams
}: {
	params: { id: string };
	searchParams: { section?: string; position?: string };
}): Promise<Metadata> {
	const company_id = params.id;
	const companyData: Company | undefined = await fetchCompanyDetail(company_id);
	const section = searchParams.section || menuList[0].section;
	let sectionLabel: string = '코딩테스트 정보 - 지원 언어, 시험 방식, 응시 후기 모음 | 몇솔';
	for (let menu of menuList) {
		if (menu.section == section) {
			sectionLabel = menu.metaTitle;
			break;
		}
	}
	const companyName = companyData ? companyData?.company_name : '';
	const metaTitle = companyData
		? `${companyData && companyData.company_name} ${sectionLabel}`
		: '몇솔';
	const metaDesc = `${companyName} 코딩테스트 준비에 필요한 모든 정보 및 후기를 몇솔에서 무료로 확인하세요.`
	const metaKeyword = `${companyName} 코딩테스트, ${companyName} 채용, ${companyName} 코딩 언어, ${companyName} 코딩테스트 후기, 개발자 취업 준비, 몇솔`

	return {
		title: metaTitle,
		description:metaDesc,
		keywords: metaKeyword,
		openGraph: {
			title: metaTitle,
			description:metaDesc,
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

export default async function Page({
	params,
	searchParams
}: {
	params: { id: string };
	searchParams: { section?: string; position?: string };
}) {
	const company_id = params.id;
	const section = searchParams.section || menuList[0].section;
	const companyData: Company | undefined = await fetchCompanyDetail(company_id);
	if (!companyData) {
		notFound();
	}
	const positions: Position[] = companyData.positions;
	const position_id = searchParams.position || positions[0]?.position_id;
	if (!position_id) {
		notFound();
	}
	const data: TestData = await fetchPositionData(position_id);

	return (
		<>
			<div className="relative h-32 w-full bg-[url('/company_sm.png')] bg-cover bg-center sm:bg-[url('/company_30.png')] md:h-64 lg:h-64"></div>
			<div className="relative flex flex-col items-center justify-center border-b border-t border-gray-30 border-t-gray-30 bg-white py-10 md:bg-gray-5 md:py-16">
				<Container>
					<div
						className="absolute top-[-1.375rem] h-16 w-16 rounded-xl border border-gray-30 bg-cover bg-center bg-no-repeat md:top-[-3rem] md:h-24 md:w-24"
						style={{ backgroundImage: ` url(${companyData.company_logo})` }}
					/>
					<div className="flex flex-row items-center font-bold text-title-black">
						<div className="pt-[0.625rem] text-xl md:pt-0 md:text-2xl">
							{companyData.company_name}
						</div>
					</div>
				</Container>
			</div>
			<div className="flex flex-col items-center justify-between border-b border-gray-30">
				<Container className={'px-0'}>
					<div className="flex h-12 w-full">
						{menuList.map((menu) => (
							<SectionButton key={menu.label + menu.section} menu={menu}></SectionButton>
						))}
					</div>
				</Container>
			</div>
			<div className="md:my-12">
				{section == menuList[0].section ? (
					<>
						<TestInfo positions={positions} position_id={position_id} data={data} />
						<Container>
							<div className="flex w-full flex-wrap justify-between py-7 text-gray-70">
								<div className="mb-8 flex w-full flex-col justify-center text-sm md:mb-0 md:w-1/2">
									위 정보는 응시자의 설문을 바탕으로 제공되며, <br />
									채용 프로세스 변경 또는 지원 직무에 따라 일부 정보가 다를 수 있습니다.
									<br /> 공식 뱃지가 없는 정보의 경우, 실제 시험 응시 전 재확인을 권장드립니다.
								</div>
								<div className="flex w-full justify-end md:w-1/2">
									<div className="flex w-full justify-between md:w-auto md:flex-col md:justify-center">
										<div className="sm:text-70 my-auto text-center text-sm text-gray-90 md:mb-2 md:text-gray-70">
											잘못된 정보가 있나요?
										</div>
										<Link
											href={`/company/${company_id}/suggestion?position=${position_id}`}
											className="w-36 rounded-md bg-main-light px-6 py-3 text-center text-main-base"
										>
											정보 수정 요청
										</Link>
									</div>
								</div>
							</div>
						</Container>
					</>
				) : (
					<Container className="rounded-md bg-white">
						<div className="mt-10 flex min-h-80 w-full flex-col items-center justify-center text-text-base">
							<div className="mb-4 text-center text-xl">오픈 준비중!</div>
							<div className="mb-10 text-center text-xl">
								정보 제공을 위해 후기를 모으고 있어요.
							</div>
							<TrLink company_id={company_id} />
						</div>
					</Container>
				)}
			</div>
			<FeedBackBtn />
		</>
	);
}
