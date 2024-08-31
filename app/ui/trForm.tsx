'use client';
import { useState } from "react";
import { SKILLS } from "../lib/constants";
import Input from "../ui/input";
import ComboBox from "./comboBox";
import LanguageToggleButton from "./profile/languageToggleButton";
const years:number[] = [];
  for (let i = 2024; i >= 2000; i--) {
    years.push(i);
  }

export default function TrForm() {
    const [skills, setSkills] = useState<Set<string>>(new Set());
    const addSkills = (skill: string) => {
        const newSet = new Set(skills);
        newSet.add(skill);
        setSkills(newSet);
      };
      const removeSkills = (skill: string) => {
        const newSet = new Set(skills);
        newSet.delete(skill);
        setSkills(newSet);
      };
  return (
    <form>
      <div className="text-3xl font-bold">코딩테스트 후기 작성</div>
      <div className="px-5 py-16">
        <div className="border-b border-gray-30 py-6">
          <div className="text-base py-4 flex flex-wrap w-full ">
            <div className="text-gray-80 font-bold w-full md:w-1/5 ">
              기업명<span className="text-main-base textsm"> *</span>
            </div>
            <div className="text-text-base w-full md:w-4/5 mt-4 md:mt-0 flex justify-end">
              <Input required={true} />
            </div>
          </div>
          <div className="text-base py-4 flex flex-wrap w-full ">
            <div className="text-gray-80 font-bold w-full md:w-1/5 ">
              지원직무(선택)
            </div>
            <div className="text-text-base w-full md:w-4/5 mt-4 md:mt-0 flex justify-end">
              <Input />
            </div>
          </div>
          <div className="text-base py-4 flex flex-wrap w-full ">
            <div className="text-gray-80 font-bold w-full md:w-1/5 ">
              채용형태<span className="text-main-base textsm"> *</span>
            </div>
            <div className="text-text-base w-full md:w-4/5 mt-4 md:mt-0 flex justify-end">
              <Input required={true} />
            </div>
          </div>
          <div className="text-base py-4 flex flex-wrap w-full ">
            <div className="text-gray-80 font-bold w-full md:w-1/5 ">
              응시년도<span className="text-main-base textsm"> *</span>
            </div>
            <div className="text-text-base w-full md:w-4/5 mt-4 md:mt-0 flex justify-end">
            <div className="max-w-80 w-full">
            <select className="w-full border border-gray-50 px-2 py-1 rounded-lg">
                {years.map((el)=><option key={el}>{el}년</option>)}
            </select>
            </div>

            </div>
          </div>
        </div>
        <div className="border-b border-gray-30 py-6">
          <div className="text-base py-4 flex flex-wrap w-full ">
            <div className="text-gray-80 font-bold w-full md:w-1/5 ">
              전체 문제 수<span className="text-main-base textsm"> *</span>
            </div>
            <div className="text-text-base w-full md:w-4/5 mt-4 md:mt-0 flex justify-end">
              <Input type={'number'} required={true}/>
            </div>
          </div>
          <div className="text-base py-4 flex flex-wrap w-full ">
            <div className="text-gray-80 font-bold w-full md:w-1/5 ">
              푼 문제 수<span className="text-main-base textsm"> *</span>
            </div>
            <div className="text-text-base w-full md:w-4/5 mt-4 md:mt-0 flex justify-end">
              <Input type={'number'} required={true}/>
            </div>
          </div>
          <div className="text-base py-4 flex flex-wrap w-full ">
            <div className="text-gray-80 font-bold w-full md:w-1/5 ">
              합격여부<span className="text-main-base textsm"> *</span>
            </div>
            <div className="text-text-base w-full md:w-4/5 mt-4 md:mt-0 flex justify-end">
              <Input required={true}/>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-30 py-6">
        <div className="text-base py-4 flex flex-wrap w-full ">
            <div className="text-gray-80 font-bold w-full  ">
              문제 유형<span className="text-main-base textsm"> *</span>
            </div>
            <div className="text-text-base w-full mt-4 flex justify-end">
            <div className="text-text-base w-full mt-4 flex flex-col">
          <ComboBox className="max-w-full" list={SKILLS} onClick={addSkills} />
          <div>
             {Array.from(skills).map((el: string) => (
                    <LanguageToggleButton
                      key={el}
                      text={el}
                      onClick={() => removeSkills(el)}
                    />
                  ))}
          </div>

          </div>
            </div>
          </div>
        </div>
        <div className=" py-6">
        <div className="text-base py-4 flex flex-wrap w-full ">
            <div className="text-gray-80 font-bold w-full  ">
              한줄 후기<span className="text-main-base textsm"> *</span>
            </div>
            <div className="text-text-base w-full mt-4 flex justify-end">
                  <textarea required className=" w-full border border-gray-50 px-2 py-1 rounded-lg h-36" placeholder="간단한 시험 후기를 들려주세요! 직접적으로 시험의 지문, 테스트케이스, 힌트 등을 게시하게 되면 문제 유출로 간주될 수 있으니 조심해주세요!"/>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
