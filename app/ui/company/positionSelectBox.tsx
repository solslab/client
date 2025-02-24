"use client";

import { Position } from "@/app/lib/definitions";
import clsx from "clsx";
import Image from "next/image";
import { redirect, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PositionSelectBox({
  positions,selected,isOfficial
}: {
  positions: Position[];
  selected:string;
  isOfficial:boolean;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const createPageURL = (position:string) => {
    const params = new URLSearchParams(searchParams);
    params.set("position", position);
    return `${pathname}?${params}`;
  };
  const [value,setValue] = useState(selected);
  const handleChange=(e: React.ChangeEvent<HTMLSelectElement>)=>{
    setValue(e.target.value)
    router.push(createPageURL(e.target.value))

  }
  return (
    <select
      value={value}
      onChange={(e) =>handleChange(e)}
      className={clsx("shadow-customShadow py-3 px-2  ps-2 sm:ps-2 pe-9 block    border text-text-base border-gray-30 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none0",
        {
          "w-3/4":isOfficial,
          "w-full":!isOfficial
        }
      )}
    >
      {positions.map((position, index) => (
        <option value={position.position_id} key={position.position_id}>
          {position.position_name}
        </option>
      ))}
    </select>
  );
}
