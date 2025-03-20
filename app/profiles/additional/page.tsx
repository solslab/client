'use client';
import ComboBox from '@/app/ui/common/comboBox';
import NextButton from '@/app/ui/common/nextbutton';
import PrevButton from '@/app/ui/common/prevButton';
import LanguageToggleButton from '@/app/ui/profile/languageToggleButton';
import { SKILLS, PLATFORMLIST, FEILDLIST } from '@/app/lib/utils/constants';
import { startTransition, useActionState, useEffect, useState } from 'react';
import { updateAdditionalInformation } from '@/app/lib/server/mutations/user/profile';
import FieldToggleButton from '@/app/ui/profile/fieldTogglebutton';
import SubmitButton from '@/app/ui/common/submitButton';
import SmallContainer from '@/app/ui/common/smallContainer';
import { AdditionalInformationState } from '@/app/lib/types/actions/user';
export default function Page() {
	const [step, setStep] = useState(1);
	const [skills, setSkills] = useState<Set<string>>(new Set());
	const [platform, setPlatform] = useState(0);
	const [level, setLevel] = useState(0);
	const [field, setFeild] = useState<string[]>([]);
	const initialState: AdditionalInformationState = { message: null, errors: {} };
	const [state, formAction] = useActionState(updateAdditionalInformation, initialState);
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
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		formData.append('al_platform', PLATFORMLIST[platform].code);
		formData.append('member_tier', level.toString());
		formData.append('prefer_languages', Array.from(skills).toString());
		formData.append('prefer_industries', field.toString());

		startTransition(() => {});
	};

	useEffect(() => {
		const loadPreline = async () => {
			await import('preline/preline');
			window.HSStaticMethods.autoInit();
		};

		loadPreline();
	}, [step]);

	return (
		<SmallContainer className="pt-10">
			<div>
				<div className="mx-auto h-3 w-full rounded-full bg-main-light">
					<div
						className="h-3 rounded-full bg-main-base"
						style={{
							width: `${(step / 3) * 100}%`,
							transition: 'width 0.5s ease'
						}}
					></div>
				</div>
			</div>
			<form onSubmit={handleSubmit}>
				<div className="mx-auto py-16 sm:py-24 lg:py-32">
					{step == 1 ? (
						<div>
							<div className="h-48">
								<h1 className="text-center text-2xl font-bold text-gray-900 md:text-4xl">
									주로 사용하는 언어를 선택해주세요
								</h1>
								<p className="mt-6 text-center text-lg text-gray-600 md:text-2xl">
									응시할 수 있는 공고를 추천해드릴게요!
								</p>
							</div>
							<div className="flex min-h-52 flex-col items-center justify-center gap-x-6">
								<ComboBox list={SKILLS} onClick={addSkills} />
								<div className="my-10">
									{Array.from(skills).map((el: string) => (
										<LanguageToggleButton key={el} text={el} onClick={() => removeSkills(el)} />
									))}
								</div>
							</div>
							<div className="mt-10 flex justify-center">
								<NextButton active={skills.size != 0} onClick={() => setStep(2)} />
							</div>
						</div>
					) : step == 2 ? (
						<div>
							<div className="h-48">
								<h1 className="text-center text-2xl font-bold text-gray-900 md:text-4xl">
									회원님의 코딩 실력을 알려주세요!
								</h1>
								<p className="mt-6 text-center text-lg text-gray-600 md:text-2xl">
									채용공고 추천 및 합격 예측을 위한 데이터랩에 사용될 예정입니다.
								</p>
							</div>
							<div className="flex min-h-52 flex-col items-center justify-center gap-x-6">
								<select
									value={platform}
									onChange={(e) => handlePlatform(e)}
									className="mb-6 block w-80 max-w-full rounded-lg border border-gray-60 py-3 pe-9 ps-2 text-sm shadow-customShadow focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
								>
									{PLATFORMLIST.map((platform, index) => (
										<option value={index} key={platform.platform}>
											{platform.platform}
										</option>
									))}
								</select>
								<select
									value={level}
									onChange={(e) => setLevel(Number(e.target.value))}
									className="block w-80 max-w-full rounded-lg border border-gray-60 py-3 pe-9 ps-2 text-sm shadow-customShadow focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
								>
									{PLATFORMLIST[platform].level.map((platform) => (
										<option value={platform.value} key={platform.label}>
											{platform.label}
										</option>
									))}
								</select>
							</div>
							<div className="mt-10 flex justify-center">
								<PrevButton onClick={() => setStep(step - 1)} />
								<NextButton onClick={() => setStep(3)} active={skills.size != 0} />
							</div>
						</div>
					) : (
						<div>
							<div className="h-48">
								<h1 className="text-center text-2xl font-bold text-gray-900 md:text-4xl">
									어떤 기업에 가고 싶으신가요?
								</h1>
								<p className="mt-6 text-center text-lg text-gray-600 md:text-2xl">
									최대 5개까지 선택할 수 있습니다.
								</p>
							</div>
							<div className="min-h-52">
								<div className="mx-auto flex max-w-xl flex-wrap justify-center">
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

							<div className="mt-10 flex justify-center">
								<PrevButton onClick={() => setStep(step - 1)} />
								<SubmitButton active={field.length != 0} onClick={() => undefined} />
							</div>
						</div>
					)}
				</div>
			</form>
		</SmallContainer>
	);
}
