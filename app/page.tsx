import Search from "./ui/search";
import SearchDropDown from "./ui/searchDropdown";
import Container from "./ui/container";
import FeedBackBtn from "./ui/feedBackBtn";
import Image from "next/image";

export default function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";
  let isFocused = false;
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <div className=" bg-sky-100 w-full h-screen flex justify-center items-center relative">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="w-full animate-[logo_24s_linear_infinite_2s] absolute left-0 top-1/10">
            <Image src='/icons/naver.png' alt='naver logo' width={160} height={34} className="-translate-x-100 w-auto h-auto"/>
            </div>
            <div className="w-full animate-[logo_32s_linear_infinite_7s] absolute left-0 top-2/10">
            <Image src='/icons/baemin.png' alt='baemin logo' width={160} height={34} className="-translate-x-100 w-auto h-auto"/>
            </div>
            <div className="w-full animate-[logo_26s_linear_infinite_5s] absolute left-0 top-3/10">
            <Image src='/icons/toss.png' alt='toss logo' width={160} height={40} className="-translate-x-100 w-auto h-auto"/>
            </div>
            <div className="w-full animate-[logo_30s_linear_infinite_5s] absolute left-0 top-4/10">
            <Image src='/icons/carrot.png' alt='dang geun market logo' width={80} height={80} className="-translate-x-100 w-auto h-auto"/>
            </div>
            <div className="w-full animate-[logo_24s_linear_infinite_1s] absolute left-0 top-5/10">
            <Image src='/icons/hanaBank.png' alt='hana bank logo' width={160} height={40} className="-translate-x-100 w-auto h-auto"/>
            </div>
            <div className="w-full animate-[logo_28s_linear_infinite_1s] absolute left-0 top-6/10">
            <Image src='/icons/hyundaiCard.png' alt='hyundaiCard logo' width={160} height={40} className="-translate-x-100 w-auto h-auto"/>
            </div>
            <div className="w-full animate-[logo_26s_linear_infinite_2s] absolute left-0 top-7/10">
            <Image src='/icons/kakao.png' alt='kakao logo' width={160} height={40} className="-translate-x-100 w-auto h-auto"/>
            </div>
            <div className="w-full animate-[logo_23s_linear_infinite_3s] absolute left-0 top-8/10">
            <Image src='/icons/kt.png' alt='kt logo' width={160} height={40} className="-translate-x-100 w-auto h-auto"/>
            </div>
            <div className="w-full animate-[logo_21s_linear_infinite_1s] absolute left-0 top-9/10o">
            <Image src='/icons/line.png' alt='line logo' width={160} height={40} className="-translate-x-100 w-auto h-auto"/>
            </div>
            <div className="w-full animate-[logo_27s_linear_infinite_8s] absolute left-0 top-3/10">
            <Image src='/icons/skTelecom.png' alt='SK telecom logo' width={160} height={40} className="-translate-x-100 w-auto h-auto"/>
            </div>
            <div className="w-full animate-[logo_32s_linear_infinite_4s] absolute left-0 top-6/10">
            <Image src='/icons/wanted.png' alt='wanted logo' width={100} height={100} className="-translate-x-100 w-auto h-auto"/>
            </div>


          </div>
          <div className="w-full h-full flex justify-center items-center backdrop-blur-sm">
          <Container className=" flex relative max-w-7xl h-46 justify-center">
            <div className="flex flex-col justify-center items-center z-30 ">
              <div>
              <div>
                <div className="text-5xl pb-6 font-extrabold bg-gradient-text-1 text-center text-transparent bg-clip-text">
                  더 빠르고, 쉽게
                </div>
                <div className="text-5xl pb-20 font-extrabold bg-gradient-text-1 text-center text-transparent bg-clip-text">
                  기업 코딩테스트를 준비하는 방법
                </div>
              </div>

              <div className="relative">
                <Search placeholder="지금 바로 기업을 검색해 보세요!" />
                <div>
                  <SearchDropDown query={query} />
                </div>
              </div>
              </div>
            </div>
          </Container>
          </div>
        </div>
        <div className='hidden lg:block'>
        <FeedBackBtn/>
        </div>

      </main>
    </>
  );
}
