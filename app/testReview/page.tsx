import XsContainer from '../ui/xsContainer';
import TrForm from '../ui/trForm';

export default async function Page({ searchParams }: { searchParams: { company_id?: string } }) {
	return (
		<div className="flex min-h-screen justify-between">
			<XsContainer>
				<TrForm company_id={searchParams.company_id} />
			</XsContainer>
		</div>
	);
}
