'use client';
import { usePathname, useSearchParams } from "next/navigation";
import Row from "../row";
import Link from "next/link";
import clsx from "clsx";
interface Menu {
    label:string;
    query:string;
}


export default function SectionButton({ menu }:{menu:Menu}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const query = params.get('query') || `companyInfo`;

    const createPageURL = (query:string) => {
      const params = new URLSearchParams(searchParams);
      params.set('query', query);
      return `${pathname}?${params}`;
    };
  return (
<Link href={createPageURL(menu.query)} className={clsx(`flex flex-1  justify-center items-center min-w-0 `, {
                        'border-b-2 border-black': query==menu.query
                    })} >{menu.label}</Link>
  );
}
