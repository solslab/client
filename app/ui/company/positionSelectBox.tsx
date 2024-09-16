"use client";

import { Position } from "@/app/lib/definitions";
import { redirect, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PositionSelectBox({
  positions,selected
}: {
  positions: Position[];
  selected:string;
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
      className="shadow-customShadow py-3 px-2  pe-9 block w-full  sm:w-60 border text-text-base border-gray-30 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none0"
    >
      {positions.map((position, index) => (
        <option value={position.position_id} key={position.position_id}>
          {position.position_name}
        </option>
      ))}
    </select>
  );
}
