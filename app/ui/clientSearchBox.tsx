'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { CompanyQuery } from "../lib/definitions";
import { fetchFilteredCompanys } from "../lib/data";
import Link from "next/link";
import clsx from "clsx";

export default function ClientSearchBox() {
    const [query, setQuery] = useState('');
	const [value, setValue] = useState('');
	const [companyList, setCompanyList] = useState<CompanyQuery[]>([]);

    const clearFeild = ()=>{
        setValue('');
        setCompanyList([]);
    }

	useEffect(() => {
        if(value==''){
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
        fetchQuery();
	}, [query]);


    return(
        <div className="relative hidden sm:block">
         <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-5">
          <Image src='/icons/search.png' alt="search" width={20} height={20}/>
          </div>
          <input
            className={clsx(`w-700 h-14 py-3 px-16 block border border-gray-50 text-xl rounded-full focus:outline-none shadow-customShadow`,{
                'border-b-0 outline-none bg-white rounded-b-none rounded-t-2.5xl':companyList.length>0
            })}
            type="text"
            role="combobox"
            aria-expanded="false"
            placeholder={'지금 바로 기업을 검색해 보세요!'}
            onChange={(e) => {
                setValue(e.target.value);
            }}
            value={value}
          />
        </div>
        <div>
        <div className="absolute  w-full ">
      <div className={clsx(`w-full bg-white mx-auto max-h-56 overflow-y-scroll scrollbar-hide shadow-customShadow`,
        {
            'border-x-gray-50 border-b-gray-50 border-x border-b rounded-b-2.5xl':companyList.length>0
        }
      )}>
        
      {   companyList&&
        companyList.map((el:CompanyQuery)=>
            <Link
            href={`/company/${el.company_id}`}
            key={el.company_id}

      >
        <div
          className="py-4 px-4 hover:bg-gray-100 rounded-md flex"
        >
            <div
            className="bg-cover bg-center bg-no-repeat  w-12 h-12 mr-4 rounded-sm border border-gray-5 "
            style={{ backgroundImage: ` url(${el.company_logo})` }}
          />
          <div className="flex flex-col justify-center text-lg">{el.company_name}</div>
        </div>
      </Link>)
    }
    {
        companyList&& <div onClick={clearFeild} className="fixed w-screen h-screen top-0 left-0 -z-10"></div>
    }
      </div>

    </div>
        </div>
        
      </div>
    )
}