import Link from "next/link";
import { fetchFilteredCompanys } from "../lib/data";

export default async function SearchDropDown({ query }: { query: string }) {
  const result = await fetchFilteredCompanys(query);
  return (
    <>
    {   result&&
        result.map((el)=>
            <Link
            href={`/company/${el.company_id}`}
            key={el.company_id}
        className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg"
        style={{}}
        data-hs-combo-box-output=""
      >
        <div
          className="max-h-72 rounded-b-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 "
          data-hs-combo-box-output-items-wrapper=""
        >
          {el.company_name}
        </div>
      </Link>)
    }
    </>

  );
}
