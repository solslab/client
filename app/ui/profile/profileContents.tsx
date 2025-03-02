'use client';

import { fetchProfile } from '@/app/lib/server/queries/user';
import { findPlatformAndLabel } from '@/app/lib/utils/helpers';
import LanguageBox from '../common/languageBox';
import FieldBox from '../common/fieldBox';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/app/ui/shadcn/components/ui/skeleton';

interface Profile {
	name: string;
	nickname: string;
	email: string;
	member_tier: string;
	prefer_languages: string[];
	prefer_industries: string[];
}

type TierData = { label: string | null } | undefined;

export default function ProfileContents() {
	const [profileData, setProfileData] = useState<Profile | null>(null);
	const [tierLabel, setTierLabel] = useState<TierData>(undefined);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchProfileData = async () => {
			try {
				const data = await fetchProfile();
				const tierLabelData = findPlatformAndLabel(Number(data.member_tier)) || {
					label: null
				};
				setProfileData(data);
				setTierLabel(tierLabelData);
			} catch (error) {
				console.error('프로필 데이터를 불러오는데 실패했습니다:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchProfileData();
	}, []);

	const ProfileField = ({ label, value }: { label: string; value: string | null }) => (
		<div className="flex w-full flex-wrap py-4 text-base">
			<div className="flex w-full flex-col justify-center font-bold text-gray-80 md:w-1/5">
				{label}
			</div>
			<div className="mt-4 w-full text-text-base md:mt-0 md:w-4/5">
				{isLoading ? <Skeleton className="h-6 w-32" /> : value || '-'}
			</div>
		</div>
	);

	return (
		<div className="px-5 py-16">
			<ProfileField label="이름" value={profileData?.name || null} />
			<ProfileField label="닉네임" value={profileData?.nickname || null} />
			<ProfileField label="이메일" value={profileData?.email || null} />
			<ProfileField label="티어 / 점수" value={tierLabel?.label || null} />

			<div className="flex w-full flex-wrap py-4 text-base">
				<div className="flex w-full flex-col justify-start font-bold text-gray-80 md:w-1/5">
					선호 언어
				</div>
				<div className="mt-4 flex w-full flex-wrap gap-2 text-text-base md:mt-0 md:w-4/5">
					{isLoading ? (
						<Skeleton className="h-8 w-32" />
					) : profileData?.prefer_languages && profileData?.prefer_languages.length > 0 ? (
						profileData?.prefer_languages.map((language: string) => (
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
				<div className="mt-4 flex w-full flex-wrap gap-2 text-text-base md:mt-0 md:w-4/5">
					{isLoading ? (
						<Skeleton className="h-8 w-32" />
					) : profileData?.prefer_industries ? (
						profileData.prefer_industries.map((industry: string) => (
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
