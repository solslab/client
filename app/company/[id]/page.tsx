
import { tokenTest } from "@/app/lib/auth";
import {
  fetchCompanyData,
  fetchCompanyDetail,
  fetchPositionData,
  redirectWithLogout,
} from "@/app/lib/data";
import { Company, Position, TestData } from "@/app/lib/definitions";
import InfoItem from "@/app/ui/company/infoItem";
import PositionSelectBox from "@/app/ui/company/positionSelectBox";
import SectionButton from "@/app/ui/company/sectionButton";
import Container from "@/app/ui/container";
import TestBtn from "@/app/ui/testBtn";
import { cookies } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
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
const infoList = [];
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
  console.log(data,'@@@@@')
//   const res = await fetch('http://localhost:3001/api/cookie/set', {
//     method: 'POST',
// });
const testFunc = async()=>{
  const response = await fetch('http://localhost:3001/api/cookie/set', {
    method: 'GET',
    credentials: 'include', // 쿠키 설정을 위해 credentials 옵션 추가
  });
  if (!response.ok) {
    throw new Error('네트워크 응답이 올바르지 않습니다.');
  }
  
  const datas = await response.json();
  return datas
}

await testFunc();





  return (
    <>
      <div className="w-full bg-cyan-400 h-20 md:h-48 lg:h-60"></div>
      <div className="flex flex-col  items-center justify-center border-b py-16 border-gray-300 relative">
        <Container>
          <div
            className="bg-no-repeat bg-center w-24 h-24 rounded-md absolute top-[-3rem]"
            style={{ backgroundImage: ` url(${companyData.company_logo})` }}
          />
          <div className="flex flex-row items-center">
            <div className="text-3xl ">{companyData.company_name}</div>
          </div>
        </Container>
      </div>
      <div className="flex flex-col  items-center justify-between border-b border-gray-300">
        <Container className={"px-0"}>
          <TestBtn/>
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
      <div className="my-12">
        {query == menuList[0].query ? (
          <>
            <Container className={"px-0 bg-white rounded-md"}>
              <div className="w-full rounded-md">
                <div className="flex flex-col  items-center justify-between border-b border-gray-300 py-7">
                  <div className="w-full px-6">
                    <div className="flex flex-row w-full flex-wrap mb-4">
                      <div className=" w-full md:w-1/4 text-base my-auto">
                        직무구분
                      </div>
                      <div className=" w-full md:w-3/4">
                        <PositionSelectBox
                          positions={positions}
                          selected={position_id}
                        />
                      </div>
                    </div>
                    <div className="flex flex-row w-full flex-wrap ">
                      <div className=" w-full md:w-1/4 text-base my-auto">
                        지원언어
                      </div>
                      <div className=" w-full md:w-3/4 flex flex-wrap ">
                        {data.support_languages.length ? (
                          data.support_languages.map((language) => (
                            <div
                              key={language}
                              className="border border-gray-400 rounded-2xl px-4 py-1 mx-2 my-2"
                            >
                              {language}
                            </div>
                          ))
                        ) : (
                          <div className="flex py-2 px-6 bg-gray-200 rounded-3xl">
                            <Image
                              src={"/icons/lock.png"}
                              width={24}
                              height={24}
                              alt="time icon"
                            />
                            <div className="text-sm ml-2 ">
                              회원에게만 공개된 정보입니다.
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-b border-gray-300 py-7">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-full px-6">
                    <InfoItem
                      src={"/icons/calendar.png"}
                      label={"시험시간"}
                      data={data.test_time}
                    />
                    <InfoItem
                      src={"/icons/messageCode.png"}
                      label={"문제수"}
                      data={data.problem_info}
                    />
                    <InfoItem
                      src={"/icons/jump.png"}
                      label={"IDE사용"}
                      data={data.permit_ide}
                    />
                    <InfoItem
                      src={"/icons/glassEye.png"}
                      label={"구글링"}
                      data={data.permit_search}
                    />
                    <InfoItem
                      src={"/icons/interrogation.png"}
                      label={"히든 테스트케이스"}
                      data={data.hidden_case}
                    />
                    <InfoItem
                      src={"/icons/document.png"}
                      label={"시험방식"}
                      data={data.exam_mode}
                    />
                    <InfoItem
                      src={"/icons/marker.png"}
                      label={"응시장소 / 플랫폼"}
                      data={data.test_place}
                    />
                  </div>
                </div>
                <div className=" py-7">
                  <div className="w-full px-6">
                    <label>참고사항</label>
                    <div className="bg-gray-200 p-4 mt-4 rounded-md">
                      {data.note}
                    </div>
                  </div>
                </div>
              </div>
            </Container>
            <Container>
              <div className="flex justify-between py-7">
                <div className="max-w-60 text-sm text-gray-400">
                  위 정보는 응시자의 설문을 바탕으로 제공되며, 채용 프로세스
                  변경 또는 지원 직무에 따라 일부 정보가 다를 수 있습니다. 공식
                  뱃지가 없는 정보의 경우, 실제 시험 응시 전 재확인을
                  권장드립니다.
                </div>
                <div>
                  <div>잘못된 정보가 있나요?</div>
                  <button className="py-3 px-6 border rounded-md">
                    정보 수정 요청
                  </button>
                </div>
              </div>
            </Container>
          </>
        ) : (
          <div>데이터랩 준비중~</div>
        )}
      </div>
    </>
  );
}
