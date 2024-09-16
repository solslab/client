import Search from "./ui/search";
import SearchDropDown from "./ui/searchDropdown";
import Container from "./ui/container";
import FeedBackBtn from "./ui/feedBackBtn";
import Image from "next/image";
import Float from "./ui/interaction/float";
import ClientSearchBox from "./ui/clientSearchBox";

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
      <main className="flex min-h-screen flex-col items-center justify-between">
        <div className=" w-full h-screen flex justify-center items-center relative">
          <Float/>

          <div className="w-full h-full flex justify-center items-center backdrop-blur-sm bg-white bg-opacity-65">
          <Container className=" flex relative max-w-7xl h-46 justify-center">
            <div className="flex flex-col justify-center items-center z-30 ">
              <div>
              <div>
                <div className="text-4xl pb-6 font-extrabold bg-gradient-text-2 text-center text-transparent bg-clip-text">
                  더 빠르고, 쉽게
                </div>
                <div className="text-4xl pb-16 font-extrabold bg-gradient-text-2 text-center text-transparent bg-clip-text">
                  기업 코딩테스트를 준비하는 방법
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

      </main>
    </>
  );
}
