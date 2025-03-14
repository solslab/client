'use client';
import { Profile } from '@/app/lib/types/models';
import { findEnglishTierLabel } from '@/app/lib/utils/helpers';
import { FEILDLIST, SKILLS } from '@/app/lib/utils/constants';
import { useEffect, useState, useMemo } from 'react';
import FieldToggleButton from './fieldTogglebutton';
import LanguageToggleButton from './languageToggleButton';
import ComboBox from '../common/comboBox';
import { updateAdditionalInformation } from '@/app/lib/server/mutations/user/profile';
import { Input } from '@/app/ui/shadcn/components/ui/input';
import { Button } from '@/app/ui/shadcn/components/ui/button';
import { Loader2 } from 'lucide-react';
import { getSolvedTier } from '@/app/lib/server/queries/solved';
import { getTierStyle } from '@/app/lib/utils/style';
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

type AdditionalInformationFormData = z.infer<typeof AdditionalInformationFormSchema>;
type TierStep = 'input' | 'loading' | 'result' | 'error';

export default function ProfileEdit({ profileData }: { profileData: Profile }) {
	const [skills, setSkills] = useState<Set<string>>(new Set(profileData.prefer_languages));
	const [industryField, setIndustryFeild] = useState<string[]>(profileData.prefer_industries || []);
	const [step, setStep] = useState<TierStep>(profileData.member_tier != null ? 'result' : 'input');
	const [solvedId, setSolvedId] = useState('');
	console.log(profileData);

	const form = useForm<AdditionalInformationFormData>({
		resolver: zodResolver(AdditionalInformationFormSchema),
		defaultValues: {
			nickname: profileData.nickname || undefined,
			member_tier: profileData.member_tier === null ? undefined : Number(profileData.member_tier),
			prefer_languages: profileData.prefer_languages || [],
			prefer_industries: profileData.prefer_industries || []
		}
	});

	const validateSolvedId = (id: string): boolean => {
		if (!id.trim()) {
			form.setError('member_tier', { message: '아이디를 입력해주세요.' });
			return false;
		}
		return true;
	};

	const resetTierState = () => {
		setStep('input');
		setSolvedId('');
	};

	const handleTierCheck = async () => {
		if (!validateSolvedId(solvedId)) return;

		setStep('loading');

		try {
			const result = await getSolvedTier(solvedId);

			if ('error' in result) {
				form.setError('member_tier', { message: result.error });
				setStep('error');
				return;
			}
			const tierLabel = findEnglishTierLabel(result.tier)?.label || 'Unrated';
			form.setValue('member_tier', result.tier);
			setStep('result');
		} catch (err) {
			form.setError('member_tier', {
				message: '티어 정보를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.'
			});
			setStep('error');
		}
	};

	const handleFeild = (value: string) => {
		const list: string[] = [...industryField];

		if (list.includes(value)) {
			const filteredList = list.filter((el) => el !== value);
			setIndustryFeild(filteredList);
		} else if (list.length < 5) {
			list.push(value);
			setIndustryFeild(list);
		}
	};
	useEffect(() => {
		form.setValue('prefer_industries', industryField);
	}, [industryField]);
	useEffect(() => {
		form.setValue('prefer_languages', Array.from(skills));
	}, [skills]);

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

	async function onSubmit(data: AdditionalInformationFormData) {
		try {
			const result = await updateAdditionalInformation({ message: '', errors: {} }, data);

			if (result?.errors && Object.keys(result.errors).length > 0) {
				// 서버 에러 처리
				if (result.errors && Object.keys(result.errors).length > 0) {
					// 필드별 에러 설정
					Object.entries(result.errors).forEach(([field, messages]) => {
						if (Array.isArray(messages) && messages.length > 0) {
							form.setError(field as any, { message: messages[0] });
						}
					});
				} else {
					form.setError('root', { message: result.message });
				}
			}
		} catch (error) {
			console.error('폼 제출 중 오류 발생:', error);
			form.setError('root', { message: '폼 제출 중 오류가 발생했습니다.' });
		}
	}

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
							<FormItem className="w-full py-4 text-base">
								<div className="flex w-full">
									<FormLabel className="flex w-full flex-col justify-center font-bold text-gray-80 md:w-1/5">
										닉네임
									</FormLabel>
									<FormControl className="mt-4 w-full md:mt-0 md:w-4/5">
										<Input className="w-full max-w-80" {...field} />
									</FormControl>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="member_tier"
						render={({ field }) => {
							const tierInfo = useMemo(() => {
								const label = findEnglishTierLabel(Number(field.value))?.label || 'Unrated';
								return {
									label,
									style: getTierStyle(label)
								};
							}, [field.value]);

							return (
								<FormItem className="flex w-full flex-wrap py-4 text-base">
									<div className="flex w-full items-center">
										<FormLabel className="flex w-full items-center font-bold text-gray-80 md:w-1/5">
											solved.ac 티어
										</FormLabel>
										<div className="mt-0 w-full md:w-4/5">
											{step === 'input' && (
												<div className="flex items-center space-x-2">
													<Input
														className="max-w-44"
														placeholder="solved.ac 아이디 입력"
														value={solvedId}
														onChange={(e) => setSolvedId(e.target.value)}
													/>
													<Button
														type="button"
														onClick={handleTierCheck}
														className="whitespace-nowrap bg-text-base text-[13px]"
													>
														티어 불러오기
													</Button>
												</div>
											)}
											{step === 'loading' && (
												<div className="flex items-center space-x-2">
													<Loader2 className="h-5 w-5 animate-spin text-blue-500" />
													<span className="text-sm">티어 정보를 불러오는 중입니다...</span>
												</div>
											)}
											{step === 'result' && (
												<div className="flex items-center space-x-4">
													<span className="text-lg font-bold" style={tierInfo.style}>
														{tierInfo.label}
													</span>
													<Button type="button" variant="outline" onClick={resetTierState}>
														다시 불러오기
													</Button>
													<input type="hidden" {...field} />
												</div>
											)}
											{step === 'error' && (
												<div className="flex flex-col space-x-4">
													<Button
														type="button"
														className="max-w-44"
														variant="outline"
														onClick={resetTierState}
													>
														다시 시도하기
													</Button>
												</div>
											)}
										</div>
									</div>

									<FormMessage />
								</FormItem>
							);
						}}
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
											active={industryField.includes(el)}
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
