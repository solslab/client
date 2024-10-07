import Search from "./ui/search";
import SearchDropDown from "./ui/searchDropdown";
import Container from "./ui/container";
import FeedBackBtn from "./ui/feedBackBtn";
import Image from "next/image";
import Float from "./ui/interaction/float";
import ClientSearchBox from "./ui/clientSearchBox";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: '몇솔 | 개발자 취업 준비 필수 플랫폼',
	description:
		'기업별 코딩테스트 정보를 한 번에. 지원자들의 100% 리얼 후기로 더 확실하게 대비하세요.',
	icons: {
		icon: '/favicon.png'
	},
	openGraph: {
		title: '몇솔 | 개발자 취업 준비 필수 플랫폼',
		description:
			'기업별 코딩테스트 정보를 한 번에. 지원자들의 100% 리얼 후기로 더 확실하게 대비하세요.',
		siteName: '몇솔',
		images: [
			{
				url: 'https://sols.kr/og.png',
				width: 1200,
				height: 628,
				alt: 'openGraph Image'
			}
		]
	}
};


export default function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";
  let isFocused = false;
  console.log(process.memoryUsage());
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-between">
        <div className=" w-full h-screen flex justify-center items-center relative">
          <Float/>

          <div className="w-full h-full flex justify-center items-center backdrop-blur-sm bg-white bg-opacity-65">
          <Container className=" flex relative max-w-7xl h-46 justify-center">
            <div className="flex flex-col justify-center items-center z-30 ">
              <div>
              <div className="text-3xl">
                <div className=" pb-6 font-extrabold bg-gradient-text-2 text-center text-transparent bg-clip-text">
                  더 빠르고, 쉽게
                </div>
                <div className="hidden sm:block pb-16 font-extrabold bg-gradient-text-2 text-center text-transparent bg-clip-text">
                  기업 코딩테스트를 준비하는 방법
                </div>
                <div className=" block sm:hidden  pb-6 font-extrabold bg-gradient-text-2 text-center text-transparent bg-clip-text">
                  기업 코딩테스트를 
                </div>
                <div className=" block sm:hidden  pb-16 font-extrabold bg-gradient-text-2 text-center text-transparent bg-clip-text">
                  준비하는 방법
                </div>
                
              </div>

             <ClientSearchBox/>
              </div>
            </div>
          </Container>
          </div>
        </div>
        <div className='hidden lg:block'>
        </div>

      </div>
    </>
  );
}
