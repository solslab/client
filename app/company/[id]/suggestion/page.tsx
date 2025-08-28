import { fetchCompanyDetail } from '@/app/lib/server/queries/company';
import { Company, Position, TestData } from '@/app/lib/types/models/company';
import SuggestionForm from '@/app/ui/company/suggestionForm';
import { notFound } from 'next/navigation';
import SmallContainer from '@/app/ui/common/smallContainer';
import { NEXT_PUBLIC_IMAGE_URL } from '@/app/lib/utils/constants';

export default async function Page({
	params,
	searchParams
}: {
	params: { id: string };
	searchParams: { position?: string };
}) {
	const company_id = params.id;

	const companyData: Company | undefined = await fetchCompanyDetail(company_id);
	if (!companyData) {
		notFound();
	}
	const positions: Position[] = companyData.positions;
	const position_id = searchParams.position || positions[0]?.position_id;
	if (!position_id) {
		notFound();
	}

	return (
		<div className="flex min-h-screen justify-between bg-white py-20">
			<SmallContainer>
				<div>
					<div className="text-2xl font-bold text-title-black">정보 수정 요청</div>
					<div className="px-5 py-16">
						<div className="flex">
							<div
								className="h-12 w-12 rounded-md border border-gray-30 bg-cover bg-center bg-no-repeat mr-2"
								style={{
									backgroundImage: companyData.company_logo
										? `url(${NEXT_PUBLIC_IMAGE_URL}/${companyData.company_logo})`
										: 'url(/companyLogo/default_company_logo.png)'
								}}
							/>
							<div className="ml-2 flex flex-row items-center">
								<div className="text-base">{companyData.company_name}</div>
							</div>
						</div>
						<SuggestionForm position_id={position_id} />
					</div>
				</div>
			</SmallContainer>
		</div>
	);
}
