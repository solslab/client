import Link from "next/link";
import { fetchFilteredCompanys } from "../lib/data";
import { CompanyQuery } from "../lib/definitions";

export default async function SearchDropDown({ query }: { query: string }) {
  const result = await fetchFilteredCompanys(query);
  return (
    <div className="absolute  w-full  mt-2">
      <div className="w-11/12 bg-white rounded-md mx-auto">
      {   result&&
        result.map((el:CompanyQuery)=>
            <Link
            href={`/company/${el.company_id}`}
            key={el.company_id}

      >
        <div
          className="py-2 px-4 hover:bg-gray-100 rounded-md"
        >
          {el.company_name}
        </div>
      </Link>)
    }
      </div>

    </div>

  );
}
