import {
  fetchCompanyDetail,
  fetchPositionData,
} from "@/app/lib/data";
import { Company, Position, TestData } from "@/app/lib/definitions";
import SectionButton from "@/app/ui/company/sectionButton";
import TestInfo from "@/app/ui/company/testInfo";
import TrLink from "@/app/ui/company/trLink";
import Container from "@/app/ui/container";
import FeedBackBtn from "@/app/ui/feedBackBtn";
import Link from "next/link";
import { notFound } from "next/navigation";
const menuList = [
  {
    label: "코딩테스트 정보 ",
    section: "companyInfo",
  },
  {
    label: "데이터랩",
    section: "dataLab",
  },
];

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { section?: string; position?: string };
}) {
  const company_id = params.id;
  const section = searchParams.section || menuList[0].section;
  const companyData: Company = await fetchCompanyDetail(company_id);
  if (!companyData) {
    notFound();
  }
  const positions: Position[] = companyData.positions;
  const position_id = searchParams.position || positions[0]?.position_id;
  if(!position_id) {
    notFound();
  }
  const data: TestData = await fetchPositionData(position_id);

  return (
    <>
      <div className="w-full h-44 md:h-64 lg:h-64 bg-[url('/company_3.png')] bg-cover bg-center blur-lg relative">
      </div>
      <div className="flex flex-col  items-center justify-center border-b py-10 md:py-16 border-gray-30 relative border-t border-t-gray-30 bg-white  md:bg-gray-5">
        <Container>
          <div
            className="bg-cover bg-no-repeat bg-center w-16 h-16 md:w-24 md:h-24  rounded-xl absolute  top-[-2rem] md:top-[-3rem] border border-gray-30 "
            style={{ backgroundImage: ` url(${companyData.company_logo})` }}
          />
          <div className=" flex flex-row items-center text-title-black font-bold">
            <div className="text-xl md:text-2xl ">{companyData.company_name}</div>
          </div>
        </Container>
      </div>
      <div className="flex flex-col  items-center justify-between border-b border-gray-30 ">
        <Container className={"px-0"}>
          <div className="w-full flex h-12 ">
            {menuList.map((menu) => (
              <SectionButton
                key={menu.label + menu.section}
                menu={menu}
              ></SectionButton>
            ))}
          </div>
        </Container>
      </div>
      <div className="md:my-12">
        {section == menuList[0].section ? (
          <>
            <TestInfo positions={positions} position_id={position_id} data={data} />
            <Container>
              <div className="flex flex-wrap justify-between py-7 w-full text-gray-70">
                <div className=" text-sm mb-8 md:mb-0  w-full md:w-1/2 flex flex-col justify-center">
                  위 정보는 응시자의 설문을 바탕으로 제공되며, <br />
                  채용 프로세스 변경 또는 지원 직무에 따라 일부 정보가 다를 수
                  있습니다.
                  <br /> 공식 뱃지가 없는 정보의 경우, 실제 시험 응시 전
                  재확인을 권장드립니다.
                </div>
                <div className="w-full md:w-1/2 flex justify-end">
                  <div className="flex justify-between w-full md:w-auto md:flex-col md:justify-center ">
                    <div className=" text-sm text-gray-90 sm:text-text-base  text-center my-auto md:mb-2">
                      잘못된 정보가 있나요?
                    </div>
                    <Link  href={`/company/${company_id}/suggestion?position=${position_id}`} className="py-3 px-6  w-36 rounded-md bg-main-light text-main-base text-center">
                      정보 수정 요청</Link>
                  </div>
                </div>
              </div>
            </Container>
          </>
        ) : (
          
          <Container className="bg-white rounded-md">
            <div className="w-full mt-10 min-h-80 flex flex-col justify-center items-center text-text-base">

                <div className=" text-center text-xl mb-4">오픈 준비중!</div>
                <div className=" text-center text-xl mb-10">정보 제공을 위해 후기를 모으고 있어요.</div>
                <TrLink/>
              </div>


          </Container>

        )}
      </div>
      <FeedBackBtn/>
    </>
  );
}
