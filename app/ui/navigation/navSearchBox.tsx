import { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchFilteredCompanys } from '@/app/lib/data';
import { CompanyQuery } from '@/app/lib/definitions';
import Link from 'next/link';
import clsx from 'clsx';
export default function NavSearchBox() {
	const [query, setQuery] = useState('');
	const [value, setValue] = useState('');
	const [companyList, setCompanyList] = useState<CompanyQuery[]>([]);

    const clearFeild = ()=>{
        setValue('');
        setQuery('')
        setCompanyList([]);
    }

	useEffect(() => {
        if(value==''){
			setQuery('')
            setCompanyList([]);
        }
		const handler = setTimeout(() => {
            if(value!=''){
                setQuery(value);
            }
		}, 200);

		return () => {
			clearTimeout(handler);
		};
	}, [value]);
	useEffect(() => {
    const fetchQuery = async () => {
			const data = await fetchFilteredCompanys(query);
			setCompanyList(data);
		};
    if(query!=''){
      fetchQuery();
    }
	}, [query]);


	return (
		<div className="relative  hidden sm:block">
			<div className="relative">
				<div className="pointer-events-none absolute inset-y-0 start-0 z-20 flex items-center ps-3">
					<Image src="/icons/search.png" alt="search" width={16} height={16} />
				</div>
				<input
					className={clsx(`block h-10 w-72 text-sm rounded-3xl border px-8 py-3 border-gray-50 bg-gray-5 focus:outline-none `,{
						'border-b-0 outline-none bg-white rounded-b-none rounded-t-2.5xl':companyList.length>0
					})}
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
				<div className="absolute w-72">
					<div className={clsx(`mx-auto max-h-56 w-full overflow-y-scroll  bg-white scrollbar-hide overflow-hidden`,
						{
							'border-x-gray-50 border-b-gray-50 border-x border-b rounded-b-2.5xl':companyList.length>0
						}
					)}>
						{companyList &&
							companyList.map((el: CompanyQuery) => (
								<Link href={`/company/${el.company_id}`} key={el.company_id}>
									<div onClick={clearFeild} className=" px-4 py-2 text-sm hover:bg-gray-100">{el.company_name}</div>
								</Link>
							))}
							{
								companyList.length>0&& <div onClick={clearFeild} className="fixed w-screen h-screen top-0 left-0 -z-10"></div>
							}
					</div>
				</div>
			</div>
		</div>
	);
}
