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
import {
  AdditionalInformationState,
  updateAdditionalInformation,
} from "@/app/lib/actions";

export default function ProfileEdit({ profileData }: { profileData: Profile }) {
  const platformIndex = findPlatformIndex(profileData.al_platform) || 0;
  const [skills, setSkills] = useState<Set<string>>(
    new Set(profileData.prefer_languages),
  );
  const [platform, setPlatform] = useState(platformIndex);
  const [level, setLevel] = useState(profileData.member_tier || 0);
  const [field, setFeild] = useState<string[]>(
    profileData.prefer_industries || [],
  );
  const initialState: AdditionalInformationState = {
    message: null,
    errors: {},
  };
  const [state, formAction] = useActionState(
    updateAdditionalInformation,
    initialState,
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
      <div className="text-3xl font-bold text-title-black">정보 수정</div>
      <div className="px-5 py-16">
        <div className="flex w-full flex-wrap py-4 text-lg">
          <div className="flex w-full flex-col justify-center font-bold text-gray-80 md:w-1/5">
            이름
          </div>
          <div className="mt-4 w-full text-gray-70 md:mt-0 md:w-4/5">
            {profileData.name}
          </div>
        </div>
        <div className="flex w-full flex-wrap py-4 text-lg">
          <div className="flex w-full flex-col justify-center font-bold text-gray-80 md:w-1/5">
            이메일
          </div>
          <div className="mt-4 w-full text-gray-70 md:mt-0 md:w-4/5">
            {profileData.email}
          </div>
        </div>
        <div className="flex w-full flex-wrap py-4 text-lg">
          <div className="flex w-full flex-col justify-center font-bold text-gray-80 md:w-1/5">
            닉네임
          </div>
          <div className="mt-4 w-full text-text-base md:mt-0 md:w-4/5">
            <Input
              name="nickname"
              id="nickname"
              defaultValue={profileData.nickname}
            />
          </div>
        </div>
        <div className="flex w-full flex-wrap py-4 text-lg">
          <div className="w-full font-bold text-gray-80 md:w-1/5">
            티어 / 점수
          </div>
          <div className="mt-4 w-full text-text-base md:mt-0 md:w-4/5">
            <div className="w-full max-w-80">
              <select
                value={platform}
                id=" al_platform"
                onChange={(e) => handlePlatform(e)}
                className="w-full max-w-full rounded-lg border border-gray-50 px-2 py-1 shadow-customShadow focus:outline-none disabled:opacity-50"
              >
                {PLATFORMLIST.map((platform, index) => (
                  <option value={index} key={platform.platform}>
                    {platform.platform}
                  </option>
                ))}
              </select>
            </div>

            {platform != 0 && (
              <div className="mt-4 w-full max-w-80">
                <select
                  id="member_tier"
                  value={level}
                  onChange={(e) => setLevel(Number(e.target.value))}
                  className="w-full max-w-full rounded-lg border border-gray-50 px-2 py-1 shadow-customShadow focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
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
        <div className="flex w-full flex-wrap py-4 text-lg">
          <div className="w-full font-bold text-gray-80 md:w-1/5">
            선호 언어
          </div>
          <div className="mt-4 flex w-full flex-col text-text-base md:mt-0 md:w-4/5">
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
        <div className="flex w-full flex-wrap py-4 text-lg">
          <div className="w-full font-bold text-gray-80 md:w-1/5">
            취업 희망분야
          </div>
          <div className="mt-4 flex w-full flex-wrap text-text-base md:mt-0 md:w-4/5">
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
