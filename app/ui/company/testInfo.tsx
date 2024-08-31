
import { Position, TestData } from "@/app/lib/definitions";
import Container from "../container";
import PositionSelectBox from "./positionSelectBox";
import Image from "next/image";
import InfoItem from "./infoItem";
import LanguageBox from "../languageBox";

export default function TestInfo({positions,position_id, data }:{positions:Position[],position_id:string,data: TestData}) {

  return (
    <Container className={"px-0 bg-white rounded-md"}>
    <div className="w-full rounded-md">
      <div className="flex flex-col  items-center justify-between border-b border-gray-300 py-7">
        <div className="w-full px-6">
          <div className="flex flex-row w-full flex-wrap mb-4">
            <div className=" w-full md:w-1/4 text-base my-auto">
              직무구분
            </div>
            <div className=" w-full md:w-3/4  mt-4 md:mt-0">
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
              {data.support_languages.length > 0 ? (
                data.support_languages.map((language) => (
                  <LanguageBox key={language} language={language}/>
                ))
              ) : (
                <div className="flex py-2 px-6 bg-gray-200 rounded-3xl mt-4 md:mt-0">
                  <div>
                    <Image
                      src={"/icons/lock.png"}
                      width={24}
                      height={24}
                      alt="time icon"
                    />
                  </div>
                  <div className="text-sm ml-2 my-auto ">
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
  );
}
