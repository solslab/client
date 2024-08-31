import Image from "next/image";
import Topnav from "./ui/navigation/topNav";
import Search from "./ui/search";
import { useSearchParams } from "next/navigation";
import SearchDropDown from "./ui/searchDropdown";
import Container from "./ui/container";

export default function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <div className=" bg-sky-100 w-full relative h-46">
          <Container className=" flex relative max-w-7xl h-46 justify-center">
            <div className="flex flex-col justify-center align-middle z-30">
              <div className="text-6xl pb-20 text-gray-800">
                코딩테스트 준비하시나요?
              </div>
              <div>
                <div className="">
                  <div className="relative" data-hs-combo-box>
                    <Search placeholder="기업을 검색해보세요" />
                    <div data-hs-combo-box-output>
                      <SearchDropDown query={query} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Image
              src="/blueEclipse.png"
              alt="eclipse"
              width={166}
              height={166}
              className="absolute left-0 top-24 blur-md"
            />
            <Image
              src="/dice.png"
              alt="eclipse"
              width={804}
              height={632}
              className="absolute right-0 bottom-0 blur-md"
            />
          </Container>
        </div>
        <div className="bg-gradient-to-b w-full h-90 from-custom-purple-1 to-custom-purple-2 relative min-h-screen">
        <Image
              alt="companys logo"
              src="/nclcbPicture.png"
              width={1900}
              height={1000}
              className="absolute left-1/2 transform -translate-x-1/2 "
            />
          <div className="flex flex-col items-center relative">
            <div className="text-6xl z-10 text-white mt-40 text-center ">
              기업별 코테 정보부터 <br />
              난이도까지 한눈에 확인!
            </div>
            <div className='w-1/2 flex justify-center'>
              <Image
                alt="light"
                className="z-10 mt-20"
                src="/light3.png"
                width={542}
                height={486}
              />
            </div>
          </div>
          <div>
          </div>

        </div>
      </main>
    </>
  );
}
