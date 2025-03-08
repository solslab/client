'use client';
import { Profile } from '@/app/lib/types/models';
import { findPlatformIndex } from '@/app/lib/utils/helpers';
import { FEILDLIST, PLATFORMLIST, SKILLS, SOLVEDACLEVEL } from '@/app/lib/utils/constants';
import { startTransition, useActionState, useState } from 'react';
import FieldToggleButton from './fieldTogglebutton';
import LanguageToggleButton from './languageToggleButton';
import ComboBox from '../common/comboBox';
import { updateAdditionalInformation } from '@/app/lib/server/mutations/user/profile';
import { AdditionalInformationState } from '@/app/lib/types/actions';
import { Input } from '@/app/ui/shadcn/components/ui/input';
import { Button } from '@/app/ui/shadcn/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/app/ui/shadcn/components/ui/select';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/app/ui/shadcn/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AdditionalInformationFormSchema } from '@/app/lib/server/schemas/user';

type FormData = z.infer<typeof AdditionalInformationFormSchema>;

export default function ProfileEdit({ profileData }: { profileData: Profile }) {
	const platformIndex = findPlatformIndex(profileData.al_platform) || 0;
	const [skills, setSkills] = useState<Set<string>>(new Set(profileData.prefer_languages));
	const [platform, setPlatform] = useState(platformIndex);
	const [field, setFeild] = useState<string[]>(profileData.prefer_industries || []);
	const initialState: AdditionalInformationState = {
		message: null,
		errors: {}
	};
	const [state, formAction] = useActionState(updateAdditionalInformation, initialState);

	const form = useForm<FormData>({
		resolver: zodResolver(AdditionalInformationFormSchema),
		defaultValues: {
			nickname: profileData.nickname || '',
			member_tier: Number(profileData.member_tier) || 0,
			prefer_languages: profileData.prefer_languages || [],
			prefer_industries: profileData.prefer_industries || []
		}
	});

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

	const onSubmit = async (data: FormData) => {
		const formData = new FormData();
		formData.append('nickname', data.nickname || '');
		formData.append('al_platform', PLATFORMLIST[platform].code);
		formData.append('member_tier', data.member_tier.toString());
		formData.append('prefer_languages', Array.from(skills).toString());
		formData.append('prefer_industries', field.toString());

		startTransition(() => {
			formAction(formData);
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<div className="text-2xl font-bold text-title-black">정보 수정</div>
				<div className="space-y-6 px-5 pt-16">
					<div className="flex w-full flex-wrap py-4 text-base">
						<FormLabel className="flex w-full flex-col justify-center font-bold text-gray-80 md:w-1/5">
							이름
						</FormLabel>
						<div className="mt-4 w-full text-gray-70 md:mt-0 md:w-4/5">{profileData.name}</div>
					</div>

					<div className="flex w-full flex-wrap py-4 text-base">
						<FormLabel className="flex w-full flex-col justify-center font-bold text-gray-80 md:w-1/5">
							이메일
						</FormLabel>
						<div className="mt-4 w-full text-gray-70 md:mt-0 md:w-4/5">{profileData.email}</div>
					</div>

					<FormField
						control={form.control}
						name="nickname"
						render={({ field }) => (
							<FormItem className="flex w-full flex-wrap py-4 text-base">
								<FormLabel className="flex w-full flex-col justify-center font-bold text-gray-80 md:w-1/5">
									닉네임
								</FormLabel>
								<FormControl className="mt-4 w-full md:mt-0 md:w-4/5">
									<Input className="w-full max-w-80" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="member_tier"
						render={({ field }) => (
							<FormItem className="flex w-full flex-wrap py-4 text-base">
								<FormLabel className="w-full font-bold text-gray-80 md:w-1/5">
									solved.ac 티어
								</FormLabel>
								<FormControl className="mt-4 w-full md:mt-0 md:w-4/5">
									<Select
										value={field.value.toString()}
										onValueChange={(value) => field.onChange(Number(value))}
									>
										<SelectTrigger className="w-full max-w-80">
											<SelectValue placeholder="티어를 선택해주세요" />
										</SelectTrigger>
										<SelectContent className="max-h-60 overflow-y-auto">
											{SOLVEDACLEVEL.level.map((platform) => (
												<SelectItem value={platform.value.toString()} key={platform.label}>
													{platform.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="prefer_languages"
						render={({ field }) => (
							<FormItem className="flex w-full flex-wrap py-4 text-base">
								<FormLabel className="w-full font-bold text-gray-80 md:w-1/5">선호 언어</FormLabel>
								<div className="mt-4 flex w-full flex-col text-text-base md:mt-0 md:w-4/5">
									<ComboBox list={SKILLS} onClick={addSkills} />
									<div className="mt-2 flex flex-wrap gap-2">
										{Array.from(skills).map((el: string) => (
											<LanguageToggleButton key={el} text={el} onClick={() => removeSkills(el)} />
										))}
									</div>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="prefer_industries"
						render={({ field }) => (
							<FormItem className="flex w-full flex-wrap py-4 text-base">
								<FormLabel className="w-full font-bold text-gray-80 md:w-1/5">
									취업 희망 분야
								</FormLabel>
								<div className="mt-4 flex w-full flex-wrap gap-2 text-text-base md:mt-0 md:w-4/5">
									{FEILDLIST.map((el) => (
										<FieldToggleButton
											key={el}
											text={el}
											onClick={() => handleFeild(el)}
											active={field.value.includes(el)}
										/>
									))}
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button className="w-full" type="submit" variant="main">
					저장하기
				</Button>
			</form>
		</Form>
	);
}
