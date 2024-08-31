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
<Link href={createPageURL(menu.query)} className={clsx(`flex justify-center items-center w-40 font-semibold`, {
                        "border-b-2 border-main-base text-main-base": query==menu.query,
                        " border-black text-text-base": query!=menu.query
                    })} >{menu.label}</Link>
  );
}
