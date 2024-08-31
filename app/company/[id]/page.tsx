import {
  fetchCompanyDetail,
  fetchPositionData,
} from "@/app/lib/data";
import { Company, Position, TestData } from "@/app/lib/definitions";
import InfoItem from "@/app/ui/company/infoItem";
import PositionSelectBox from "@/app/ui/company/positionSelectBox";
import SectionButton from "@/app/ui/company/sectionButton";
import TestInfo from "@/app/ui/company/testInfo";
import Container from "@/app/ui/container";
import LanguageBox from "@/app/ui/languageBox";
import Image from "next/image";
import { notFound } from "next/navigation";
const menuList = [
  {
    label: "기업정보",
    query: "companyInfo",
  },
  {
    label: "데이터랩",
    query: "dataLab",
  },
];

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { query?: string; position?: string };
}) {
  const company_id = params.id;
  const query = searchParams.query || menuList[0].query;
  const companyData: Company = await fetchCompanyDetail(company_id);
  if (!companyData) {
    notFound();
  }
  const positions: Position[] = companyData.positions;
  const position_id = searchParams.position || positions[0].position_id;
  const data: TestData = await fetchPositionData(position_id);

  return (
    <>
      <div className="w-full bg-cyan-400 h-28 md:h-48 lg:h-60"></div>
      <div className="flex flex-col  items-center justify-center border-b py-8 md:py-16 border-gray-300 relative">
        <Container>
          <div
            className="bg-no-repeat bg-center w-16 h-16 md:w-24 md:h-24  rounded-md absolute  top-[-2rem] md:top-[-3rem]"
            style={{ backgroundImage: ` url(${companyData.company_logo})` }}
          />
          <div className="flex flex-row items-center">
            <div className="text-xl md:text-3xl ">{companyData.company_name}</div>
          </div>
        </Container>
      </div>
      <div className="flex flex-col  items-center justify-between border-b border-gray-300">
        <Container className={"px-0"}>
          <div className="w-full flex h-12 items-stretch">
            {menuList.map((menu) => (
              <SectionButton
                key={menu.label + menu.query}
                menu={menu}
              ></SectionButton>
            ))}
          </div>
        </Container>
      </div>
      <div className="md:my-12">
        {query == menuList[0].query ? (
          <>
            <TestInfo positions={positions} position_id={position_id} data={data} />
            <Container>
              <div className="flex flex-wrap justify-between py-7 w-full">
                <div className=" text-sm mb-4 md:mb-0 text-gray-400 w-full md:w-1/2 flex flex-col justify-center">
                  위 정보는 응시자의 설문을 바탕으로 제공되며, <br />
                  채용 프로세스 변경 또는 지원 직무에 따라 일부 정보가 다를 수
                  있습니다.
                  <br /> 공식 뱃지가 없는 정보의 경우, 실제 시험 응시 전
                  재확인을 권장드립니다.
                </div>
                <div className="w-full md:w-1/2 flex justify-end">
                  <div className="flex justify-between w-full md:w-auto md:flex-col md:justify-center ">
                    <div className=" text-sm text-gray-400 text-center my-auto md:mb-4">
                      잘못된 정보가 있나요?
                    </div>
                    <button className="py-3 px-6  w-36 rounded-md bg-sky-100 text-indigo-800">
                      정보 수정 요청
                    </button>
                  </div>
                </div>
              </div>
            </Container>
          </>
        ) : (
          <Container className={"px-0"}>
            <div className="w-full bg-white mt-10 rounded-md">
              <div className="w-full h-80">
                <div className=" text-center text-3xl text-text-base">오픈 준비중!<br/>정보 제공을 위해 후기를 모으고 있어요.</div>
                <button className="text-2xl">코딩 테스트 후기 작성하기</button>
              </div>
            </div>

          </Container>

        )}
      </div>
    </>
  );
}
