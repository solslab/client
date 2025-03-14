'use client';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormDescription
} from '@/app/ui/shadcn/components/ui/form';
import { TestReviewFormSchema } from '@/app/lib/server/schemas/review';
import { createTestReview } from '@/app/lib/server/mutations/review/test';
import { PASS_STATUS, PROBLEM_TYPE, TR_CAREER, TR_POSITIONS } from '@/app/lib/utils/constants';

// Components
import LanguageToggleButton from '../profile/languageToggleButton';
import TrComboBox from '../testReview/trCombobox';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/app/ui/shadcn/components/ui/select';
import TrSearchBox from '../testReview/trSearchbox';
import BasicAlert from '../common/basicAlert';
import { Button } from '../shadcn/components/ui/button';
import NaturalNumberInput from '../common/naturalNumberInput';
import ScrollToTop from '../common/ScrollToTop';
import { Slider } from '@/app/ui/shadcn/components/ui/slider';

// Utils
import { redirectToPrev } from '@/app/lib/utils/cookie';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../shadcn/components/ui/hover-card';
import Image from 'next/image';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 2013 }, (_, i) => currentYear - i);

type TrFormData = z.infer<typeof TestReviewFormSchema>;

export default function TrForm({ company_id }: { company_id: string | undefined }) {
	// Local state
	const [companyId, setCompanyId] = useState(company_id);
	const [problems, setProblems] = useState<Set<string>>(new Set());
	const [solvedProblemOptions, setSolvedProblemOptions] = useState<number[]>([]);
	const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

	// Form initialization
	const form = useForm<TrFormData>({
		resolver: zodResolver(TestReviewFormSchema),
		defaultValues: {
			company_id: companyId,
			company_name: undefined,
			tr_position: undefined,
			tr_career: undefined,
			tr_year: undefined,
			tr_problem_num: 0,
			tr_solved_num: undefined,
			tr_pass_status: undefined,
			tr_comment: undefined,
			tr_problem_type: [] as string[],
			difficulty: 0
		}
	});
	useEffect(() => {
		form.setValue('tr_problem_type', Array.from(problems));
	}, [problems]);
	useEffect(() => {
		form.setValue('company_id', companyId);
	}, [companyId]);

	// Handlers
	const updateSolvedProblemOptions = (totalProblems: number) => {
		const length = Math.floor(totalProblems * 2) + 1;
		setSolvedProblemOptions(Array.from({ length }, (_, index) => index * 0.5));
	};

	const handleProblemAdd = (problem: string) => {
		setProblems((prev) => new Set(prev).add(problem));
	};

	const handleProblemRemove = (problem: string) => {
		setProblems((prev) => {
			const newSet = new Set(prev);
			newSet.delete(problem);
			return newSet;
		});
	};

	async function onSubmit(data: TrFormData) {
		try {
			const result = await createTestReview({ message: '', errors: {}, fullfilled: false }, data);

			if (result.fullfilled) {
				setIsSubmitSuccessful(true);
			} else {
				// 서버 에러 처리
				if (result.errors && Object.keys(result.errors).length > 0) {
					// 필드별 에러 설정
					Object.entries(result.errors).forEach(([field, messages]) => {
						if (Array.isArray(messages) && messages.length > 0) {
							form.setError(field as any, { message: messages[0] });
						}
					});
				} else {
					// 일반 에러 메시지 설정
					form.setError('root', { message: result.message });
				}
			}
		} catch (error) {
			console.error('폼 제출 중 오류 발생:', error);
			form.setError('root', { message: '폼 제출 중 오류가 발생했습니다.' });
		}
	}

	// Effects
	useEffect(() => {
		const subscription = form.watch((value, { name }) => {
			if (name === 'tr_problem_num' && value.tr_problem_num) {
				updateSolvedProblemOptions(Number(value.tr_problem_num));
				form.setValue('tr_solved_num', 0);
			}
		});

		return () => subscription.unsubscribe();
	}, [form]);

	return (
		<>
			<ScrollToTop />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<div className="text-2xl font-bold text-title-black">코딩테스트 후기 작성</div>
					<div className="px-5 pt-16">
						{/* 기본 정보 섹션 */}
						<div className="border-b border-gray-30 py-12">
							<FormField
								control={form.control}
								name="company_name"
								render={({ field }) => (
									<FormItem className="text-gray-80">
										<div className="flex justify-between gap-2">
											<FormLabel className="flex items-center font-bold text-gray-80">
												기업명<span className="text-main-base"> *</span>
											</FormLabel>
											<FormControl>
												<TrSearchBox
													value={field.value}
													setValue={(value) => field.onChange(value)}
													companyId={company_id}
													setCompanyId={setCompanyId}
												/>
											</FormControl>
										</div>
										<div className="text-sm font-medium text-red-500">
											<FormMessage />
										</div>
									</FormItem>
								)}
							/>
							<div className="pt-6">
								<FormField
									control={form.control}
									name="tr_position"
									render={({ field }) => (
										<FormItem>
											<div className="flex justify-between gap-2">
												<FormLabel className="flex items-center font-bold text-gray-80">
													지원직무<span className="text-main-base"> *</span>
												</FormLabel>
												<FormControl>
													<Select onValueChange={field.onChange} value={field.value}>
														<SelectTrigger className="w-full max-w-80">
															<SelectValue placeholder="선택" />
														</SelectTrigger>
														<SelectContent className="max-h-60 overflow-y-auto">
															{TR_POSITIONS.map((el) => (
																<SelectItem value={el.toString()} key={el}>
																	{el}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</FormControl>
											</div>
											<div className="text-sm font-medium text-red-500">
												<FormMessage />
											</div>
										</FormItem>
									)}
								/>
							</div>
							<div className="pt-6">
								<FormField
									control={form.control}
									name="tr_career"
									render={({ field }) => (
										<FormItem>
											<div className="flex justify-between gap-2">
												<FormLabel className="flex items-center font-bold text-gray-80">
													채용형태<span className="text-main-base"> *</span>
												</FormLabel>
												<FormControl>
													<Select onValueChange={field.onChange} value={field.value}>
														<SelectTrigger className="w-full max-w-80">
															<SelectValue placeholder="선택" />
														</SelectTrigger>
														<SelectContent>
															{TR_CAREER.map((el) => (
																<SelectItem value={el.toString()} key={el}>
																	{el}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</FormControl>
											</div>
											<div className="text-sm font-medium text-red-500">
												<FormMessage />
											</div>
										</FormItem>
									)}
								/>
							</div>
							<div className="pt-6">
								<FormField
									control={form.control}
									name="tr_year"
									render={({ field }) => (
										<FormItem>
											<div className="flex justify-between gap-2">
												<FormLabel className="flex items-center font-bold text-gray-80">
													응시년도<span className="text-main-base"> *</span>
												</FormLabel>
												<FormControl>
													<Select onValueChange={field.onChange} value={field.value}>
														<SelectTrigger className="w-full max-w-80">
															<SelectValue placeholder="선택" />
														</SelectTrigger>
														<SelectContent>
															{years.map((year) => (
																<SelectItem value={year.toString()} key={year}>
																	{year}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</FormControl>
											</div>
											<div className="text-sm font-medium text-red-500">
												<FormMessage />
											</div>
										</FormItem>
									)}
								/>
							</div>
						</div>

						{/* 문제 정보 섹션 */}
						<div className="border-b border-gray-30 py-12">
							<div className="">
								<FormField
									control={form.control}
									name="tr_problem_num"
									render={({ field }) => (
										<FormItem>
											<div className="flex justify-between gap-2">
												<FormLabel className="flex items-center font-bold text-gray-80">
													전체 문제 수<span className="text-main-base"> *</span>
												</FormLabel>
												<FormControl>
													<NaturalNumberInput
														id="tr_problem_num"
														value={field.value?.toString()}
														onChange={field.onChange}
														callBack={(value) => updateSolvedProblemOptions(value)}
													/>
												</FormControl>
											</div>
											<div className="text-sm font-medium text-red-500">
												<FormMessage />
											</div>
										</FormItem>
									)}
								/>
							</div>
							<div className="pt-6">
								<FormField
									control={form.control}
									name="tr_solved_num"
									render={({ field }) => (
										<FormItem>
											<div className="flex justify-between gap-2">
												<div className="flex">
													<FormLabel className="flex items-center font-bold text-gray-80">
														푼 문제 수<span className="text-main-base"> *</span>
													</FormLabel>
													<div className="ml-1 flex items-center">
														<SolvedProblemHoverCard />
													</div>
												</div>

												<FormControl>
													<Select onValueChange={field.onChange} value={field.value?.toString()}>
														<SelectTrigger className="w-full max-w-80">
															<SelectValue placeholder="선택" />
														</SelectTrigger>
														<SelectContent>
															{solvedProblemOptions.map((el) => (
																<SelectItem value={el.toString()} key={el}>
																	{el}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</FormControl>
											</div>
											<div className="text-sm font-medium text-red-500">
												<FormMessage />
											</div>
										</FormItem>
									)}
								/>
							</div>
							<div className="pt-6">
								<FormField
									control={form.control}
									name="tr_pass_status"
									render={({ field }) => (
										<FormItem>
											<div className="flex justify-between gap-2">
												<FormLabel className="flex items-center font-bold text-gray-80">
													합격 여부<span className="text-main-base"> *</span>
												</FormLabel>
												<FormControl>
													<Select onValueChange={field.onChange} value={field.value}>
														<SelectTrigger className="w-full max-w-80">
															<SelectValue placeholder="선택" />
														</SelectTrigger>
														<SelectContent>
															{PASS_STATUS.map((el) => (
																<SelectItem value={el.toString()} key={el}>
																	{el}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</FormControl>
											</div>
											<div className="text-sm font-medium text-red-500">
												<FormMessage />
											</div>
										</FormItem>
									)}
								/>
							</div>
						</div>

						{/* 문제 유형 섹션 */}
						<FormField
							control={form.control}
							name="tr_problem_type"
							render={({ field }) => (
								<div className="border-b border-gray-30 py-12">
									<div className="flex w-full flex-wrap py-4 text-base">
										<FormLabel className="w-full font-bold text-gray-80">
											문제 유형<span className="textsm text-main-base"> *</span>
										</FormLabel>
										<div className="mt-4 flex w-full justify-end text-text-base">
											<div className="mt-4 flex w-full flex-col text-text-base">
												<TrComboBox
													className="max-w-full"
													list={PROBLEM_TYPE}
													onClick={handleProblemAdd}
												/>
												<div>
													{Array.from(problems).map((el: string) => (
														<LanguageToggleButton
															key={el}
															text={el}
															onClick={() => handleProblemRemove(el)}
														/>
													))}
												</div>
											</div>
										</div>
									</div>
									<div className="text-sm font-medium text-red-500">
										<FormMessage />
									</div>
								</div>
							)}
						/>

						{/* 난이도 섹션 */}
						<FormField
							control={form.control}
							name="difficulty"
							render={({ field }) => (
								<div className="border-b border-gray-30 py-12">
									<div className="flex w-full flex-wrap py-4">
										<FormLabel className="mt-4 w-full font-bold">
											난이도<span className="textsm text-main-base"> *</span>
										</FormLabel>
										<FormControl>
											<div className="mt-8 flex w-full items-center justify-between text-text-base">
												<div className="w-full">
													<Slider
														value={[field.value]}
														onValueChange={(val) => field.onChange(val[0])}
														max={4}
														step={1}
													/>
													<div className="mt-4 flex justify-between text-sm text-text-base">
														<span>쉬움</span>
														<span>보통</span>
														<span>어려움</span>
													</div>
												</div>
											</div>
										</FormControl>
										<FormMessage />
									</div>
								</div>
							)}
						/>

						{/* 후기 섹션 */}
						<FormField
							control={form.control}
							name="tr_comment"
							render={({ field }) => (
								<FormItem className="py-12">
									<FormLabel className="font-bold text-gray-80">
										한줄 후기<span className="text-main-base"> *</span>
									</FormLabel>
									<FormControl>
										<textarea
											{...field}
											maxLength={100}
											className="h-36 w-full resize-none rounded-lg border border-gray-30 p-3 placeholder:text-sm"
											placeholder="간단한 시험 후기를 들려주세요! 직접적으로 시험의 지문, 테스트케이스, 힌트 등을 게시하게 되면 문제 유출로 간주될 수 있으니 조심해주세요!"
										/>
									</FormControl>
									<div className="text-sm font-medium text-red-500">
										<FormMessage />
									</div>
								</FormItem>
							)}
						/>
					</div>

					<Button className="w-full" type="submit" variant="main">
						제출하기
					</Button>
					{form.formState.errors.root?.message && (
						<p className="text-sm text-red-warning">{form.formState.errors.root.message}</p>
					)}
				</form>
			</Form>
			{isSubmitSuccessful && (
				<BasicAlert onClick={async () => await redirectToPrev()}>
					<div>제출에 성공하였습니다.</div>
				</BasicAlert>
			)}
		</>
	);
}
function SolvedProblemHoverCard() {
	return (
		<HoverCard>
			<HoverCardTrigger asChild>
				<Button variant="ghost" type="button" className="h-4 w-4 p-0">
					<Image src="/icons/interrogation1.png" alt="hover-icon" width={14} height={14} />
				</Button>
			</HoverCardTrigger>
			<HoverCardContent className="w-80">
				<div className="flex justify-between space-x-4">
					<div className="space-y-1">
						<h4 className="text-sm font-semibold">소수점 응답은 무엇인가요?</h4>
						<p className="text-sm text-text-base">
							일부 테스트 케이스를 통과했지만 정답 여부가 확실하지 않을 때 선택해주세요.
						</p>
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	);
}
