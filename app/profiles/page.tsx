"use server";

import SmallContainer from "../ui/smallContainer";
import { fetchProfile } from "../lib/data";
import { Profile } from "../lib/definitions";
import { findPlatformAndLabel } from "../lib/utils";
import LanguageBox from "../ui/languageBox";
import FieldBox from "../ui/fieldBox";
import BaseLink from "../ui/profile/baseLink";
import DeletionBtn from "../ui/profile/deletionBtn";

export default async function Page() {
  const profileData: Profile = await fetchProfile();
  const platformAndLabel = findPlatformAndLabel(
    profileData.al_platform,
    profileData.member_tier
  ) || { platform: "알수없음", label: "" };

  return (
      <SmallContainer>
        <div className="text-3xl font-bold">내 프로필</div>
        <div className="px-5 py-16">
          <div className="text-lg py-4 flex flex-wrap w-full ">
            <div className="text-gray-80 font-bold w-full md:w-1/5 flex flex-col justify-center">
              이름
            </div>
            <div className="text-text-base w-full md:w-4/5 mt-4 md:mt-0">
              {profileData.name}
            </div>
          </div>
          <div className="text-lg py-4 flex flex-wrap w-full">
            <div className="text-gray-80 font-bold w-full md:w-1/5 flex flex-col justify-center">
              닉네임
            </div>
            <div className="text-text-base w-full md:w-4/5 mt-4 md:mt-0">
              {profileData.nickname}
            </div>
          </div>
          <div className="text-lg py-4 flex flex-wrap w-full">
            <div className="text-gray-80 font-bold w-full md:w-1/5 flex flex-col justify-center">
              이메일
            </div>
            <div className="text-text-base w-full md:w-4/5 mt-4 md:mt-0">
              {profileData.email}
            </div>
          </div>
          <div className="text-lg py-4 flex flex-wrap w-full">
            <div className="text-gray-80 font-bold w-full md:w-1/5 flex flex-col justify-center">
              티어 / 점수
            </div>
            <div className="text-text-base w-full md:w-4/5 mt-4 md:mt-0">
              <span>{platformAndLabel?.label}</span>
              <span className="text-gray-70 text-sm ">
                {" "}
                ({platformAndLabel?.platform})
              </span>
            </div>
          </div>
          <div className="text-lg py-4 flex flex-wrap w-full">
            <div className="text-gray-80 font-bold w-full md:w-1/5 flex flex-col justify-center ">
              선호 언어
            </div>
            <div className="text-text-base w-full md:w-4/5 mt-4 md:mt-0 flex flex-wrap">
              {profileData.prefer_languages &&
                profileData.prefer_languages.map((language) => (
                  <LanguageBox key={language} language={language} />
                ))}
            </div>
          </div>
          <div className="text-lg py-4 flex flex-wrap w-full">
            <div className="text-gray-80 font-bold w-full md:w-1/5  flex flex-col justify-center">
              취업 희망분야
            </div>
            <div className="text-text-base w-full md:w-4/5 mt-4 md:mt-0 flex flex-wrap">
              {profileData.prefer_industries &&
                profileData.prefer_industries.map((industry) => (
                  <FieldBox key={industry} feild={industry} />
                ))}
            </div>
          </div>
        </div>
        <BaseLink text={"정보 수정하기"} href={"/profiles/edit"} />
        <DeletionBtn/>
      </SmallContainer>
  );
}
