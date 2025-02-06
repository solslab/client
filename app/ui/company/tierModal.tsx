'use client';

import { TiernState, updateTier } from '@/app/lib/actions';
import { PLATFORMLIST } from '@/app/lib/constants';
import Image from 'next/image';
import { Dispatch, SetStateAction, startTransition, useActionState, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function TierModal({
	setVisible
}: {
	setVisible: Dispatch<SetStateAction<boolean>>;
}) {
	const [platform, setPlatform] = useState(0);
	const [level, setLevel] = useState(0);
	const initialState: TiernState = {
		message: null,
		errors: {}
	};
	const [state, formAction] = useActionState(updateTier, initialState);
	const handlePlatform = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = Number(e.target.value);
		setPlatform(value);
		setLevel(PLATFORMLIST[value].level[0].value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		formData.append('al_platform', PLATFORMLIST[platform].code);
		formData.append('member_tier', level.toString());

		startTransition(() => {
			formAction(formData);
		});
	};
	return (
		<form
			onSubmit={handleSubmit}
			className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50 px-2"
		>
			<div className="relative flex min-w-60 flex-col items-center rounded-xl bg-white px-24 py-12 shadow-customShadow">
				<button onClick={() => setVisible(false)} className="absolute right-4 top-4">
					<Image src={'/icons/ex.png'} width={14} height={14} alt="ex" />
				</button>
				<div className="flex min-h-44 flex-col items-center justify-center">
					<div className="mb-8 py-4 text-center text-base text-text-base">
						<p className="pb-2">후기 작성 전 정보 입력이 필요합니다.</p>
						<span>회원님의 </span>
						<span className="font-semibold">알고리즘 풀이 실력</span>
						<span>을 알려주세요!</span>
					</div>
					<div className="flex flex-col items-center justify-center gap-x-6">
						<select
							value={platform}
							onChange={(e) => handlePlatform(e)}
							className="mb-1 mb-2 block w-60 max-w-full rounded-lg border border-gray-60 py-1.5 pe-9 text-sm shadow-customShadow focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
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
							className="block w-60 max-w-full rounded-lg border border-gray-60 py-1.5 pe-9 text-sm shadow-customShadow focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
						>
							{PLATFORMLIST[platform].level.map((platform) => (
								<option value={platform.value} key={platform.label}>
									{platform.label}
								</option>
							))}
						</select>
					</div>
					<div className="mb-10 flex w-full justify-end">
						<Button variant="link">
							<a
								href="https://solved.ac/"
								target="_blank"
								rel="noreferrer"
								className="pt-2 text-sm text-blue-500"
							>
								solved.ac 바로가기
							</a>
						</Button>
					</div>
				</div>
				<Button type="submit" variant="sols">
					제출하고 후기 작성하기
				</Button>
				{state?.message && <p className="text-center text-sm text-red-500">{state?.message}</p>}
			</div>
		</form>
	);
}
