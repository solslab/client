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
			<div className="flex w-full flex-wrap py-4 text-base">
				<div className="flex w-full flex-col justify-center font-bold text-gray-80 md:w-1/5">
					이름
				</div>
				<div className="mt-4 w-full text-text-base md:mt-0 md:w-4/5">{profileData?.name}</div>
			</div>
			<div className="flex w-full flex-wrap py-4 text-base">
				<div className="flex w-full flex-col justify-center font-bold text-gray-80 md:w-1/5">
					닉네임
				</div>
				<div className="mt-4 w-full text-text-base md:mt-0 md:w-4/5">{profileData?.nickname}</div>
			</div>
			<div className="flex w-full flex-wrap py-4 text-base">
				<div className="flex w-full flex-col justify-center font-bold text-gray-80 md:w-1/5">
					이메일
				</div>
				<div className="mt-4 w-full text-text-base md:mt-0 md:w-4/5">{profileData?.email}</div>
			</div>
			<div className="flex w-full flex-wrap py-4 text-base">
				<div className="flex w-full flex-col justify-center font-bold text-gray-80 md:w-1/5">
					티어 / 점수
				</div>
				<div className="mt-4 w-full text-text-base md:mt-0 md:w-4/5">
					<span>{platformAndLabel?.label || '-'}</span>
					<span className="text-sm text-gray-70">
						{platformAndLabel?.platform ? ` (${platformAndLabel.platform})` : ''}
					</span>
				</div>
			</div>
			<div className="flex w-full flex-wrap py-4 text-base">
				<div className="flex w-full flex-col justify-start font-bold text-gray-80 md:w-1/5">
					선호 언어
				</div>
				<div className="mt-4 flex w-full flex-wrap text-text-base md:mt-0 md:w-4/5">
					{profileData?.prefer_languages && profileData?.prefer_languages.length > 0 ? (
						profileData?.prefer_languages.map((language) => (
							<LanguageBox key={language} language={language} />
						))
					) : (
						<p>-</p>
					)}
				</div>
			</div>

			<div className="flex w-full flex-wrap py-4 text-base">
				<div className="flex w-full flex-col justify-start font-bold text-gray-80 md:w-1/5">
					취업 희망 분야
				</div>
				<div className="mt-4 flex w-full flex-wrap text-text-base md:mt-0 md:w-4/5">
					{profileData?.prefer_industries ? (
						profileData.prefer_industries.map((industry) => (
							<FieldBox key={industry} feild={industry} />
						))
					) : (
						<p>-</p>
					)}
				</div>
			</div>
		</div>
	);
}
