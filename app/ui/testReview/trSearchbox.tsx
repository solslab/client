'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchCompanyData, fetchCompanyDetail, fetchFiltereAllCompanys, fetchFilteredCompanys } from '@/app/lib/data';
import { CompanyQuery } from '@/app/lib/definitions';
import Link from 'next/link';
import clsx from 'clsx';
export default function TrSearchBox({
	value,
	setValue,
	companyId,
	setCompanyId
}: {
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
	companyId: string | undefined;
	setCompanyId: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
	const [query, setQuery] = useState('');
	const [clickFlag, setClickFlag] = useState(false);
	const [companyList, setCompanyList] = useState<CompanyQuery[]>([]);

	const clearFeild = () => {
		setQuery('');
		setCompanyList([]);
	};

	useEffect(() => {
		if (value == '') {
			setQuery('');
			setCompanyList([]);
		}
		const handler = setTimeout(() => {
			if (value != '' && clickFlag == false) {
				setQuery(value);
			}
		}, 200);

		return () => {
			clearTimeout(handler);
		};
	}, [value]);
	useEffect(() => {
		const fetchQuery = async () => {
			try{
				const data = await fetchFiltereAllCompanys(query);
				setCompanyList(data);
			}
			catch(error){
				console.error('기업 쿼리중에 문제 발생.')
			}
		};
		if (query != '') {
			fetchQuery();
		}
	}, [query]);
	useEffect(() => {
		const fetchcompanyName = async () => {
			if (companyId) {
				const name = await fetchCompanyDetail(companyId);
				if (name) {
					setValue(name.company_name);
					setCompanyId(companyId);
					setClickFlag(true);
				}
			}
		};
		fetchcompanyName();
	}, []);

	return (
		<>
			<div className="relative w-full max-w-80">
				<div className="relative w-full">
					<div className="pointer-events-none absolute inset-y-0 end-0 z-20 flex items-center pe-3">
						<Image src="/icons/search.png" alt="search" width={16} height={16} />
					</div>
					<input
						className={clsx(
							`shadow-customShadow" block h-9 w-full rounded-lg border border-gray-50 bg-gray-5 py-1 pl-4 pr-8 text-sm focus:outline-none`,
							{
								'rounded-b-none rounded-t-lg border-b-0 bg-white outline-none': query.length > 0
							}
						)}
						type="text"
						role="combobox"
                        aria-controls=""
						aria-expanded="false"
						placeholder={''}
						onChange={(e) => {
							setClickFlag(false);
							setValue(e.target.value);
							setCompanyId(undefined);
						}}
						value={value}
					/>
				</div>
				<div>
					<div className="absolute w-full max-w-80 rounded-b-lg">
						<div
							className={clsx(
								`mx-auto w-full overflow-hidden overflow-y-scroll bg-white scrollbar-hide`,
								{
									'rounded-b-lg border-x border-b border-x-gray-50 border-b-gray-50':
										query.length > 0
								}
							)}
						>
							{companyList?.length > 0 ? (
								companyList.map((el: CompanyQuery) => (
									<div
										key={el.company_id}
										onClick={() => {
											setValue(el.company_name);
											setClickFlag(true);
											setCompanyId(el.company_id);
											clearFeild();
										}}
										className="px-4 py-2 text-sm hover:bg-gray-100 "
									>
										{el.company_name}
									</div>
								))
							) : query.length > 0 ? (
								<div
									onClick={() => {
										setValue(value);
										setClickFlag(true);
										setCompanyId(undefined);
										clearFeild();
									}}
									className="px-4 py-2 text-sm hover:bg-gray-100"
								>
									{value + ' 직접 입력'}
								</div>
							) : (
								<></>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
