'use client';

import { useState, useMemo } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogClose,
	DialogTitle
} from '@/app/ui/shadcn/components/ui/dialog';
import { Input } from '@/app/ui/shadcn/components/ui/input';
import { Button } from '@/app/ui/shadcn/components/ui/button';
import Link from 'next/link';
import { Loader2, X } from 'lucide-react';
import Image from 'next/image';
import { getSolvedTier } from '@/app/lib/server/queries/solved';
import { getTierStyle } from '@/app/lib/utils/style';
import { useRouter } from 'next/navigation';
import { TierFormSchema } from '@/app/lib/server/schemas/user';
import { updateTier } from '@/app/lib/server/mutations/user/tier';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormMessage } from '@/app/ui/shadcn/components/ui/form';
import { SOLVEDACLEVEL } from '@/app/lib/utils/constants';
import { findEnglishTierLabel, getTierValue } from '@/app/lib/utils/helpers';

interface TierModalProps {
	setVisible: (visible: boolean) => void;
}

type ModalStep = 'input' | 'loading' | 'result' | 'error';
type FormData = z.infer<typeof TierFormSchema>;

// 티어 매핑을 위한 유틸리티 함수

export default function TierModal({ setVisible }: TierModalProps) {
	const router = useRouter();
	const [step, setStep] = useState<ModalStep>('input');
	const [solvedId, setSolvedId] = useState('');
	const [tier, setTier] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const form = useForm<FormData>({
		resolver: zodResolver(TierFormSchema),
		defaultValues: {
			member_tier: '0'
		}
	});

	const tierStyle = useMemo(() => getTierStyle(tier), [tier]);

	const validateSolvedId = (id: string): boolean => {
		if (!id.trim()) {
			setError('아이디를 입력해주세요.');
			setStep('error');
			return false;
		}
		return true;
	};

	const resetState = () => {
		setStep('input');
		setSolvedId('');
		setTier(null);
		setError(null);
	};

	const handleTierCheck = async () => {
		if (!validateSolvedId(solvedId)) return;

		setStep('loading');
		setError(null);

		try {
			const result = await getSolvedTier(solvedId);

			if ('error' in result) {
				setError(result.error);
				setStep('error');
				return;
			}
			const englishTierLabel = findEnglishTierLabel(result.tier)?.label || 'Unrated';
			const tierText = `${englishTierLabel} / ${result.rating}`;
			setTier(tierText);
			form.setValue('member_tier', result.tier.toString());
			setStep('result');
		} catch (err) {
			setError('티어 정보를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.');
			setStep('error');
		}
	};

	const onSubmit = async (data: FormData) => {
		try {
			const formData = new FormData();
			formData.append('member_tier', data.member_tier.toString());

			const result = await updateTier(formData);

			if (!result) {
				setError('서버로부터 응답을 받지 못했습니다.');
				return;
			}

			if (result.errors && Object.keys(result.errors).length > 0) {
				setError(result.message || '티어 업데이트 중 오류가 발생했습니다.');
				return;
			}

			setVisible(false);
			router.push('/testReview');
		} catch (err) {
			console.error('에러 발생:', err);
			setError('티어 업데이트 중 오류가 발생했습니다.');
		}
	};

	const renderStep = () => {
		const stepComponents = {
			input: <InputStep solvedId={solvedId} setSolvedId={setSolvedId} onCheck={handleTierCheck} />,
			loading: <LoadingStep />,
			result: (
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 flex flex-col space-y-4">
						<DialogDescription className="h-24 text-center text-[13px]">
							<span className="block text-center text-lg font-bold" style={tierStyle}>
								{tier}
							</span>
							<br />
							회원님의 티어가 맞는지 확인해주세요.
						</DialogDescription>
						<FormField
							control={form.control}
							name="member_tier"
							render={({ field }) => (
								<FormItem className="hidden">
									<FormMessage />
									<input type="hidden" {...field} />
								</FormItem>
							)}
						/>
						<div className="flex justify-center space-x-2 pt-1">
							<Button type="button" variant="outline" onClick={resetState}>
								다시 불러오기
							</Button>
							<Button type="submit" className="bg-main-base hover:bg-main-base/90">
								제출하고 후기 작성하기
							</Button>
						</div>
					</form>
				</Form>
			),
			error: <ErrorStep error={error} onReset={resetState} />
		};

		return stepComponents[step];
	};

	return (
		<Dialog open={true} onOpenChange={() => setVisible(false)}>
			<DialogContent className="flex h-[350px] w-[480px] flex-col pt-14">
				<DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus:outline-none disabled:pointer-events-none">
					<X className="h-4 w-4 bg-gray-50" />
					<span className="sr-only">Close</span>
				</DialogClose>
				<DialogHeader>
					<DialogTitle />
				</DialogHeader>
				<div className="flex h-full flex-col justify-between">
					{renderStep()}
					<div className="flex w-full justify-end">
						<Link href="https://solved.ac" target="_blank" rel="noopener noreferrer">
							<Button variant="link" className="text-blue-500">
								solved.ac
								<Image src="/icons/external-link.png" width={14} height={14} alt="external-link" />
							</Button>
						</Link>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

// 각 단계별 컴포넌트 분리
const InputStep = ({
	solvedId,
	setSolvedId,
	onCheck
}: {
	solvedId: string;
	setSolvedId: (id: string) => void;
	onCheck: () => void;
}) => (
	<div className="mt-4 flex flex-col space-y-4">
		<DialogDescription className="h-24 text-center">
			후기 작성 전 정보 입력이 필요합니다.
			<br />
			<br />
			회원님의 <span className="font-semibold">solved.ac 티어</span>를 입력해주세요!
		</DialogDescription>
		<div className="flex justify-center space-x-2">
			<Input
				className="max-w-44"
				placeholder="solved.ac 아이디 입력"
				value={solvedId}
				onChange={(e) => setSolvedId(e.target.value)}
			/>
			<Button onClick={onCheck} className="whitespace-nowrap bg-main-base text-[13px] hover:bg-main-base/90">
				티어 불러오기
			</Button>
		</div>
	</div>
);

const LoadingStep = () => (
	<div className="mt-4 flex flex-col items-center justify-center space-y-4 py-8">
		<Loader2 className="h-8 w-8 animate-spin text-blue-500" />
		<DialogDescription className="text-center">티어 정보를 불러오는 중입니다...</DialogDescription>
	</div>
);

const ErrorStep = ({ error, onReset }: { error: string | null; onReset: () => void }) => (
	<div className="mt-4 flex flex-col space-y-4">
		<DialogDescription className="h-24 text-center text-[13px] text-red-500">
			{error}
		</DialogDescription>
		<div className="flex justify-center space-x-2 pt-1">
			<Button variant="outline" onClick={onReset}>
				다시 시도하기
			</Button>
		</div>
	</div>
);
