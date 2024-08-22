"use client";
import ComboBox from "@/app/ui/comboBox";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { platform } from "os";
import { useEffect, useState } from "react";
const skillList = [
  "C",
  "C++",
  "C#",
  "Java",
  "JavaScript",
  "Kotlin",
  "Python",
  "Go",
  "Ruby",
  "Scala",
  "Swift",
  "SQL",
  "Oracle"
];
const platformList = [
  { platform: "선택안함", level: [] },
  {
    platform: "백준 (solved.ac)",
    level: [
      { label: "브론즈5", value: 1 },
      { label: "브론즈4", value: 2 },
      { label: "브론즈3", value: 3 },
      { label: "브론즈2", value: 4 },
      { label: "브론즈1", value: 5 },
      { label: "실버5", value: 6 },
      { label: "실버4", value: 7 },
      { label: "실버3", value: 8 },
      { label: "실버2", value: 9 },
      { label: "실버1", value: 10 },
      { label: "골드5", value: 11 },
      { label: "골드4", value: 12 },
      { label: "골드3", value: 13 },
      { label: "골드2", value: 14 },
      { label: "골드1", value: 15 },
      { label: "플레5", value: 16 },
      { label: "플레4", value: 17 },
      { label: "플레3", value: 18 },
      { label: "플레2", value: 19 },
      { label: "플레1", value: 20 },
      { label: "다이아5", value: 26 },
      { label: "다이아4", value: 27 },
      { label: "다이아3", value: 28 },
      { label: "다이아2", value: 29 },
      { label: "다이아1", value: 30 },
      { label: "루비5", value: 31 },
      { label: "루비4", value: 32 },
      { label: "루비3", value: 33 },
      { label: "루비2", value: 34 },
      { label: "루비1", value: 35 },
      { label: "마스터 (이상)", value: 36 },
    ],
  },
  {
    platform: "프로그래머스",
    level: [
      { label: "레벨1", value: 4 },
      { label: "레벨2", value: 8 },
      { label: "레벨3", value: 13 },
      { label: "레벨4", value: 19 },
      { label: "레벨5", value: 28 },
    ],
  },
  {
    platform: "CodeForces",
    level: [
      { label: "0~800", value: 5 },
      { label: "801~1200", value: 8 },
      { label: "1201~1400", value: 12 },
      { label: "1401~1600", value: 14 },
      { label: "1601~1900", value: 17 },
      { label: "1901~2100", value: 20 },
      { label: "2101~", value: 28 },
    ],
  },
];
const feildList = ["aasds", "vqwdqb", "cvdve", "dqwdqs", "qwdfqf", "gfqdssd"];

export default function Page() {
  const [step, setStep] = useState(1);
  const [skills, setSkills] = useState(new Set());
  const [platform, setPlatform] = useState(0);
  const [level, setLevel] = useState(0);
  const [field, setFeild] = useState([]);
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
  const handlePlatform = (e) => {
    setPlatform(e.target.value);
    if (e.target.value == 0) setLevel(0);
  };
  const handleFeild = (value:string)=>{
    const list = [...field];

    if(list.includes(value)){
        const filteredList = list.filter(el => el !== value);
        setFeild(filteredList)
    }
    else{
        list.push(value)
        setFeild(list)
    }

  }
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div>
        <div className="mx-auto max-w-2xl min-h-2 bg-gray-400">
          <div
            className="max-w-2xl min-h-2 bg-indigo-600"
            style={{
              width: `${(step / 3) * 100}%`,
              transition: "width 0.5s ease",
            }}
          ></div>
        </div>
      </div>
      <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:py-32">
        {step == 1 ? (
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              주로 사용하는 언어를 선택해주세요
            </h1>
            <p className="mt-6 text-sm leading-8 text-gray-600">
              응시할 수 있는 공고를 추천해드릴게요!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <ComboBox list={skillList} onClick={addSkills} />
              {Array.from(skills).map((el) => (
                <button
                  onClick={() => removeSkills(el)}
                  key={el}
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {el}
                </button>
              ))}
              <button
                onClick={() => setStep(2)}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                다음
              </button>
            </div>
          </div>
        ) : step == 2 ? (
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              회원님의 코딩 실력을 알려주세요!
            </h1>
            <p className="mt-6 text-sm leading-8 text-gray-600">
              응시할 수 있는 공고를 추천해드릴게요!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <select
                value={platform}
                onChange={(e) => handlePlatform(e)}
                className="py-3  pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              >
                {platformList.map((platform, index) => (
                  <option value={index} key={platform.platform}>
                    {platform.platform}
                  </option>
                ))}
              </select>
              {platform != 0 && (
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="py-3  pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                >
                  {platformList[platform].level.map((platform) => (
                    <option value={platform.value} key={platform.label}>
                      {platform.label}
                    </option>
                  ))}
                </select>
              )}
              <button
                onClick={() => setStep(3)}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                다음
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              취업 희망 분야를 알려주세요!
            </h1>
            <p className="mt-6 text-sm leading-8 text-gray-600">
              응시할 수 있는 공고를 추천해드릴게요!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
                {feildList.map((el)=>
                 <button key={el} onClick={()=>handleFeild(el)} className={clsx(`rounded-md px-3.5 py-2.5 text-sm font-semibold bg-white text-black shadow-sm hover:bg-gray-300`,
                    {
                        'bg-gray-700 text-white': field.includes(el),
                    }
                 )}>
                 {el}
               </button>
                )}
              <button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                다음
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
