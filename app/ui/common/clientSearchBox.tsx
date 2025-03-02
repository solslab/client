'use client';

import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import Link from 'next/link';
import clsx from 'clsx';
import { CompanyQuery } from '@/app/lib/types/models';
import { fetchFilteredCompanys } from '../../lib/server/queries/company';

interface ClientSearchBoxProps {
	onSearchStart: () => void;
	onSearchEnd: () => void;
	setIconActive: Dispatch<SetStateAction<boolean>>;
}

export default function ClientSearchBox({
	onSearchStart,
	onSearchEnd,
	setIconActive
}: ClientSearchBoxProps) {
	const [query, setQuery] = useState('');
	const [value, setValue] = useState('');
	const [companyList, setCompanyList] = useState<CompanyQuery[]>([]);

	const clearFeild = () => {
		setValue('');
		setQuery('');
		setCompanyList([]);
		onSearchEnd();
	};

	useEffect(() => {
		if (value == '') {
			setQuery('');
			setCompanyList([]);
			onSearchEnd();
		} else {
			onSearchStart();
		}
		const handler = setTimeout(() => {
			if (value != '') {
				setQuery(value);
			}
		}, 200);

		return () => {
			clearTimeout(handler);
		};
	}, [value]);
	useEffect(() => {
		if (companyList?.length > 0) {
			setIconActive(false);
		} else {
			setIconActive(true);
		}
	}, [companyList]);

	useEffect(() => {
		const fetchQuery = async () => {
			const data = await fetchFilteredCompanys(query);
			setCompanyList(data);
			if (data.length === 0) {
				onSearchEnd();
			}
		};
		if (query != '') {
			fetchQuery();
		}
	}, [query]);

	return (
		<div className="relative z-20 hidden sm:block">
			<div className="relative">
				<div className="pointer-events-none absolute inset-y-0 start-0 z-20 flex items-center ps-5">
					<Image src="/icons/search.png" alt="search" width={20} height={20} />
				</div>
				<input
					className={clsx(
						`block h-14 w-700 rounded-full border border-gray-50 px-16 py-3 text-lg shadow-customShadow focus:outline-none`,
						{
							'rounded-b-none rounded-t-4xl border-b-0 bg-white outline-none':
								companyList.length > 0
						}
					)}
					type="text"
					role="combobox"
					aria-controls=""
					aria-expanded="false"
					placeholder={'지금 바로 기업을 검색해 보세요!'}
					onChange={(e) => {
						setValue(e.target.value);
					}}
					value={value}
				/>
			</div>
			<div>
				<div
					className={clsx(`absolute max-h-60 w-full overflow-y-scroll rounded-b-4xl bg-white`, {
						'rounded-b-4xl border-x border-b border-x-gray-50 border-b-gray-50':
							companyList.length > 0
					})}
				>
					<>
						{companyList &&
							companyList.map((el: CompanyQuery) => (
								<Link href={`/company/${el.company_id}`} key={el.company_id}>
									<div className="rounded- flex px-4 py-4 hover:bg-gray-100">
										<div
											className="mr-4 h-12 w-12 rounded-lg border border-gray-20 bg-cover bg-center bg-no-repeat"
											style={{
												backgroundImage: el.company_logo
													? 'url(' + el.company_logo + ')'
													: 'url(/companyLogo/default_company_logo.png)'
											}}
										/>
										<div className="flex flex-col justify-center text-lg">{el.company_name}</div>
									</div>
								</Link>
							))}
						{companyList && (
							<div onClick={clearFeild} className="fixed left-0 top-0 -z-10 w-screen"></div>
						)}
					</>
				</div>
			</div>
		</div>
	);
}
