import Image from "next/image";
import Topnav from "./ui/navigation/topNav";
import Search from "./ui/search";
import { useSearchParams } from "next/navigation";
import SearchDropDown from "./ui/searchDropdown";

export default function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {

  const query = searchParams?.query || '';
  return (
    <>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="">
      <div className="max-w-4xl w-96">
      {/* SearchBox */}
      <div className="relative">
        <Search placeholder="기업을 검색해보세요"/>
        {/* SearchBox Dropdown */}
    <SearchDropDown query={query}/>
        {/* End SearchBox Dropdown */}
      </div>
      {/* End SearchBox */}
    </div>
      </div>

    </main>
    </>
  );
}
