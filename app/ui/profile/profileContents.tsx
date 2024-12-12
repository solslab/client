"use client";

import { fetchProfile } from "@/app/lib/data";
import { Profile } from "@/app/lib/definitions";
import { findPlatformAndLabel } from "@/app/lib/utils";
import LanguageBox from "../languageBox";
import FieldBox from "../fieldBox";
import { useEffect, useState } from "react";



type PlatformData = { platform: string|null; label: string|null } | undefined;

export default  function ProfileContents() {
  const [profileData,setProfileData] =useState<Profile | null>(null);
  const [platformAndLabel,setPlatformAndLabel] = useState<PlatformData>(undefined);

useEffect(()=>{
    const fetchProfileData =async()=>{
        const data = await fetchProfile();
        const platformAndLabelData = findPlatformAndLabel(
            data.al_platform,
            data.member_tier
          ) || { platform: null, label: null }
        setProfileData(data);
        setPlatformAndLabel(platformAndLabelData)
    }
    fetchProfileData();
},[])

  return (
    <div className="px-5 py-16">
    <div className="text-base py-4 flex flex-wrap w-full ">
      <div className="text-gray-80 font-bold w-full md:w-1/5 flex flex-col justify-center">
        이름
      </div>
      <div className="text-text-base w-full md:w-4/5 mt-4 md:mt-0">
        {profileData?.name}
      </div>
    </div>
    <div className="text-base py-4 flex flex-wrap w-full">
      <div className="text-gray-80 font-bold w-full md:w-1/5 flex flex-col justify-center">
        닉네임
      </div>
      <div className="text-text-base w-full md:w-4/5 mt-4 md:mt-0">
        {profileData?.nickname}
      </div>
    </div>
    <div className="text-base py-4 flex flex-wrap w-full">
      <div className="text-gray-80 font-bold w-full md:w-1/5 flex flex-col justify-center">
        이메일
      </div>
      <div className="text-text-base w-full md:w-4/5 mt-4 md:mt-0">
        {profileData?.email}
      </div>
    </div>
    <div className="text-base py-4 flex flex-wrap w-full">
      <div className="text-gray-80 font-bold w-full md:w-1/5 flex flex-col justify-center">
        티어 / 점수
      </div>
      <div className="text-text-base w-full md:w-4/5 mt-4 md:mt-0">
        <span>{platformAndLabel?.label}</span>
        <span className="text-gray-70 text-sm ">
          {" "}
          {platformAndLabel?.platform? "("+platformAndLabel.platform+")":""}
        </span>
      </div>
    </div>
    <div className="text-base py-4 flex flex-wrap w-full">
      <div className="text-gray-80 font-bold w-full md:w-1/5 flex flex-col justify-start ">
        선호 언어
      </div>
      <div className="text-text-base w-full md:w-4/5 mt-4 md:mt-0 flex flex-wrap">
        {profileData?.prefer_languages ?
          profileData?.prefer_languages.map((language) => (
            <LanguageBox key={language} language={language} />
          ))
        :
        <p>-</p>}
      </div>
    </div>
    <div className="text-base py-4 flex flex-wrap w-full">
      <div className="text-gray-80 font-bold w-full md:w-1/5  flex flex-col justify-start">
        취업 희망 분야
      </div>
      <div className="text-text-base w-full md:w-4/5 mt-4 md:mt-0 flex flex-wrap">
        {profileData?.prefer_industries ?
          profileData.prefer_industries.map((industry) => (
            <FieldBox key={industry} feild={industry} />
          ))
        :
        <p>-</p>}
      </div>
    </div>
  </div>
  );
}
