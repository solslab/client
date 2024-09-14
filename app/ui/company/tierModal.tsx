'use client';

import { TiernState, updateTier } from '@/app/lib/actions';
import { PLATFORMLIST } from '@/app/lib/constants';
import Image from 'next/image';
import { Dispatch, SetStateAction, startTransition, useActionState, useState } from 'react';

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
			className="fixed inset-0 flex h-screen w-screen items-center justify-center px-2"
		>
			<div className="relative flex min-w-60 flex-col items-center rounded-xl border border-gray-50 bg-white px-16 py-8 shadow-customShadow">
				<button onClick={() => setVisible(false)} className="absolute right-4 top-4">
					<Image src={'/icons/ex.png'} width={14} height={14} alt="ex" />
				</button>
				<div className="flex min-h-44 flex-col items-center justify-center">
					<div className="py-4 text-center text-lg text-text-base">
						잠깐! 후기 작성 전 정보 입력이 필요합니다.
					</div>
					<div className="flex min-h-32 flex-col items-center justify-center gap-x-6">
						<select
							value={platform}
							onChange={(e) => handlePlatform(e)}
							className="mb-1 block w-60 max-w-full rounded-lg border border-gray-60 py-1 pe-9 text-sm shadow-customShadow focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
						>
							{PLATFORMLIST.map((platform, index) => (
								<option value={index} key={platform.platform}>
									{platform.platform}
								</option>
							))}
						</select>
						{platform != 0 && (
							<select
								value={level}
								onChange={(e) => setLevel(Number(e.target.value))}
								className="block w-60 max-w-full rounded-lg border border-gray-60 py-1 pe-9 text-sm shadow-customShadow focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
							>
								{PLATFORMLIST[platform].level.map((platform) => (
									<option value={platform.value} key={platform.label}>
										{platform.label}
									</option>
								))}
							</select>
						)}
					</div>
				</div>
				<button type="submit" className="h-10 w-24 rounded-2xl bg-main-base font-bold text-white">
					제출
				</button>
				{state?.message && <p className="text-center text-sm text-red-500">{state?.message}</p>}
			</div>
		</form>
	);
}
