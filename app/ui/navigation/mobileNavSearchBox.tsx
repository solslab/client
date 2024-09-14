import { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchFilteredCompanys } from '@/app/lib/data';
import { CompanyQuery } from '@/app/lib/definitions';
import Link from 'next/link';
export default function MobileNavSearchBox() {
	const [query, setQuery] = useState('');
	const [value, setValue] = useState('');
	const [companyList, setCompanyList] = useState<CompanyQuery[]>([]);
	const [visible, setVisible] = useState(false);

	const clearFeild = () => {
		setValue('');
		setCompanyList([]);
		setVisible(false);
	};

	useEffect(() => {
		if (value == '') {
			setCompanyList([]);
		}
		const handler = setTimeout(() => {
			if (value != '') {
				setQuery(value);
			}
		}, 300);

		return () => {
			clearTimeout(handler);
		};
	}, [value]);
	useEffect(() => {
		const fetchQuery = async () => {
			const data = await fetchFilteredCompanys(query);
			setCompanyList(data);
		};
		fetchQuery();
	}, [query]);

	return (
		<div className="flex items-center sm:hidden">
			<button onClick={() => setVisible(!visible)}>
				<Image src="/icons/search.png" alt="search" width={24} height={24} />
			</button>
			{!visible ? (
				<></>
			) : (
				<div className="fixed left-0 top-16">
					<div className="relative">
						<div className="pointer-events-none absolute inset-y-0 start-0 z-20 flex items-center ps-3">
							<Image src="/icons/search.png" alt="search" width={16} height={16} />
						</div>
						<input
							className="block h-10 w-screen border bg-gray-5 px-8 py-3 shadow-inner focus:border-blue-500 focus:bg-white focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
							type="text"
							role="combobox"
							aria-expanded="false"
							placeholder={'기업을 검색해보세요!'}
							onChange={(e) => {
								setValue(e.target.value);
							}}
							value={value}
						/>
					</div>
					<div>
						<div className="absolute w-screen">
							<div className="mx-auto max-h-56 w-full overflow-y-scroll bg-white scrollbar-hide">
								{companyList &&
									companyList.map((el: CompanyQuery) => (
										<Link href={`/company/${el.company_id}`} key={el.company_id}>
											<div onClick={clearFeild} className="rounded-md px-4 py-2 hover:bg-gray-100">
												{el.company_name}
											</div>
										</Link>
									))}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
