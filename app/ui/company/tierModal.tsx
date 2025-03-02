'use client';

import { TierFormSchema } from '@/app/lib/server/schemas/user';
import { updateTier } from '@/app/lib/server/mutations/user/tier';
import { SOLVEDACLEVEL } from '@/app/lib/utils/constants';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
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
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

type FormData = z.infer<typeof TierFormSchema>;

export default function TierModal({
	setVisible
}: {
	setVisible: Dispatch<SetStateAction<boolean>>;
}) {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);

	const form = useForm<FormData>({
		resolver: zodResolver(TierFormSchema),
		defaultValues: {
			member_tier: 0
		}
	});

	async function onSubmit(data: FormData) {
		try {
			const formData = new FormData();
			formData.append('member_tier', data.member_tier.toString());

			const result = await updateTier(formData);

			if (result.errors && Object.keys(result.errors).length > 0) {
				setError(result.message);
				return;
			}

			setVisible(false);
			router.refresh();
		} catch (err) {
			setError('티어 업데이트 중 오류가 발생했습니다.');
		}
	}

	return (
		<div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50 px-2">
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

					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="flex flex-col items-center space-y-8"
						>
							<FormField
								control={form.control}
								name="member_tier"
								render={({ field }) => (
									<FormItem>
										<FormLabel>solved.ac 티어</FormLabel>
										<Select
											onValueChange={(value) => field.onChange(Number(value))}
											value={field.value.toString()}
										>
											<FormControl>
												<SelectTrigger className="w-60 max-w-full rounded-lg border border-gray-60 text-sm shadow-customShadow">
													<SelectValue placeholder="티어를 선택해주세요" />
												</SelectTrigger>
											</FormControl>
											<SelectContent className="max-h-60 overflow-y-auto">
												{SOLVEDACLEVEL.level.map((level) => (
													<SelectItem value={level.value.toString()} key={level.label}>
														{level.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="mb-10 flex w-full justify-end">
								<Button variant="link" type="button">
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

							<Button className="bg-main-base" type="submit" variant="default">
								제출하고 후기 작성하기
							</Button>
						</form>
					</Form>

					{error && <p className="mt-4 text-center text-sm text-red-500">{error}</p>}
				</div>
			</div>
		</div>
	);
}
