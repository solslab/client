import Link from "next/link";
import { fetchFilteredCompanys } from "@/app/lib/data";
import { CompanyQuery } from "@/app/lib/definitions";

export default async function NavSearchDropDown({ query }: { query: string }) {
  const result = await fetchFilteredCompanys(query);

  return (
    <div className="absolute  w-96 ">
      <div className="w-full bg-white rounded-md mx-auto max-h-56 overflow-y-scroll scrollbar-hide">
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
