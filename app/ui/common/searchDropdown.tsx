import Link from 'next/link';
import { fetchFilteredCompanys } from '@/app/lib/server/queries/company';
import { CompanyQuery } from '@/app/lib/types/models';

export default async function SearchDropDown({ query }: { query: string }) {
	const result = await fetchFilteredCompanys(query);

	return (
		<div className="absolute w-full">
			<div className="mx-auto max-h-56 w-full overflow-y-scroll rounded-md bg-white scrollbar-hide">
				{result &&
					result.map((el: CompanyQuery) => (
						<Link href={`/company/${el.company_id}`} key={el.company_id}>
							<div className="rounded-md px-4 py-2 hover:bg-gray-100">{el.company_name}</div>
						</Link>
					))}
			</div>
		</div>
	);
}
