"use client";
import { Profile } from "@/app/lib/definitions";
import { findPlatformIndex } from "@/app/lib/utils";
import Input from "../input";
import { FEILDLIST, PLATFORMLIST, SKILLS } from "@/app/lib/constants";
import { startTransition, useActionState, useState } from "react";
import FieldToggleButton from "./fieldTogglebutton";
import LanguageToggleButton from "./languageToggleButton";
import ComboBox from "../comboBox";
import BaseSubmitButton from "../baseSubmitButton";
import { AdditionalInformationState, updateAdditionalInformation } from "@/app/lib/actions";

export default function ProfileEdit({ profileData }: { profileData: Profile }) {
  const platformIndex = findPlatformIndex(profileData.al_platform) || 0;
  const [skills, setSkills] = useState<Set<string>>(
    new Set(profileData.prefer_languages)
  );
console.log(platformIndex)
  const [platform, setPlatform] = useState(platformIndex);
  const [level, setLevel] = useState(profileData.member_tier || 0);
  const [field, setFeild] = useState<string[]>(profileData.prefer_industries||[]);
  const initialState: AdditionalInformationState = {
    message: null,
    errors: {},
  };
  const [state, formAction] = useActionState(
    updateAdditionalInformation,
    initialState
  );
  const handlePlatform = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setPlatform(value);
    setLevel(PLATFORMLIST[value].level[0].value);
  };
  const handleFeild = (value: string) => {
    const list: string[] = [...field];

    if (list.includes(value)) {
      const filteredList = list.filter((el) => el !== value);
      setFeild(filteredList);
    } else if (list.length < 5) {
      list.push(value);
      setFeild(list);
    }
  };
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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("al_platform", PLATFORMLIST[platform].code);
    formData.append("member_tier", level.toString());
    formData.append("prefer_languages", Array.from(skills).toString());
    formData.append("prefer_industries", field.toString());

    startTransition(() => {
      formAction(formData);
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="text-3xl font-bold">정보 수정</div>
      <div className="px-5 py-16">
        <div className="text-lg py-4 flex flex-wrap w-full ">
          <div className="text-gray-80 font-bold w-full md:w-1/5 flex flex-col justify-center">
            이름
          </div>
          <div className="text-gray-70 w-full md:w-4/5 mt-4 md:mt-0">
            {profileData.name}
          </div>
        </div>
        <div className="text-lg py-4 flex flex-wrap w-full">
          <div className="text-gray-80 font-bold w-full md:w-1/5 flex flex-col justify-center">
            이메일
          </div>
          <div className="text-gray-70 w-full md:w-4/5 mt-4 md:mt-0">
            {profileData.email}
          </div>
        </div>
        <div className="text-lg py-4 flex flex-wrap w-full">
          <div className="text-gray-80 font-bold w-full md:w-1/5 flex flex-col justify-center">
            닉네임
          </div>
          <div className="text-text-base w-full md:w-4/5 mt-4 md:mt-0">
            <Input name='nickname' id="nickname" defaultValue={profileData.nickname} />
          </div>
        </div>
        <div className="text-lg py-4 flex flex-wrap w-full">
          <div className="text-gray-80 font-bold w-full md:w-1/5 ">
            티어 / 점수
          </div>
          <div className="text-text-base w-full md:w-4/5 mt-4 md:mt-0">
            <div className="max-w-80 w-full">
              <select
                value={platform}
                id=" al_platform"
                onChange={(e) => handlePlatform(e)}
                className="shadow-customShadow w-full border border-gray-50 px-2 py-1 rounded-lg  max-w-full   focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
              >
                {PLATFORMLIST.map((platform, index) => (
                  <option value={index} key={platform.platform}>
                    {platform.platform}
                  </option>
                ))}
              </select>
            </div>

            {platform != 0 && (
              <div className="max-w-80 w-full mt-4">
                <select
                  id="member_tier"
                  value={level}
                  onChange={(e) => setLevel(Number(e.target.value))}
                  className="shadow-customShadow w-full border border-gray-50 px-2 py-1 rounded-lg  max-w-full   focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {PLATFORMLIST[platform].level.map((platform) => (
                    <option value={platform.value} key={platform.label}>
                      {platform.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
        <div className="text-lg py-4 flex flex-wrap w-full">
          <div className="text-gray-80 font-bold w-full md:w-1/5 ">
            선호 언어
          </div>
          <div className="text-text-base w-full md:w-4/5 mt-4 md:mt-0 flex flex-col">
            <ComboBox list={SKILLS} onClick={addSkills} />
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
        <div className="text-lg py-4 flex flex-wrap w-full">
          <div className="text-gray-80 font-bold w-full md:w-1/5 ">
            취업 희망분야
          </div>
          <div className="text-text-base w-full md:w-4/5 mt-4 md:mt-0 flex flex-wrap">
            {FEILDLIST.map((el) => (
              <FieldToggleButton
                key={el}
                text={el}
                onClick={() => handleFeild(el)}
                active={field.includes(el)}
              />
            ))}
          </div>
        </div>
      </div>
      <BaseSubmitButton text={"저장하기"} />
    </form>
  );
}
