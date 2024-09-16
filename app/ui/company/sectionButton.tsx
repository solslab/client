'use client';
import { usePathname, useSearchParams } from "next/navigation";
import Row from "../row";
import Link from "next/link";
import clsx from "clsx";
interface Menu {
    label:string;
    section:string;
}


export default function SectionButton({ menu }:{menu:Menu}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const section = params.get('section') || `companyInfo`;

    const createPageURL = (section:string) => {
      const params = new URLSearchParams(searchParams);
      params.set('section', section);
      return `${pathname}?${params}`;
    };
  return (
<Link href={createPageURL(menu.section)} className={clsx(`flex justify-center items-center w-40 font-semibold `, {
                        "border-b-2 border-main-base text-main-base": section==menu.section,
                        " border-black text-text-base": section!=menu.section
                    })} >{menu.label}</Link>
  );
}
