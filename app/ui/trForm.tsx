'use client';
import { startTransition, useActionState, useState } from 'react';
import { PASS_STATUS, PROBLEM_TYPE, TR_CAREER } from '../lib/constants';
import Input from '../ui/input';
import LanguageToggleButton from './profile/languageToggleButton';
import BaseSubmitButton from './baseSubmitButton';
import TrComboBox from './testReview/trCombobox';
import { TestReviewState, createTestReview } from '../lib/actions';
import Select from './select';
import TrFormRow from './testReview/trFormRow';
import BasicAlert from './basicAlert';
import { redirectToPrev } from '../lib/cookie';
const years: number[] = [];
for (let i = 2024; i >= 2000; i--) {
	years.push(i);
}

export default function TrForm() {
	const [problems, setProblems] = useState<Set<string>>(new Set());
	const addProblem = (problem: string) => {
		const newSet = new Set(problems);
		newSet.add(problem);
		setProblems(newSet);
	};
	const removeProblem = (problem: string) => {
		const newSet = new Set(problems);
		newSet.delete(problem);
		setProblems(newSet);
	};
	const initialState: TestReviewState = {
		message: null,
		errors: {}
	};
	const [state, formAction] = useActionState(createTestReview, initialState);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		formData.append('tr_problem_type', Array.from(problems).toString());
		startTransition(() => {
			formAction(formData);
		});
	};
	return (
		<>
		<form onSubmit={handleSubmit}>
			<div className="text-3xl font-bold text-title-black">코딩테스트 후기 작성</div>
			<div className="px-5 py-16">
				<div className="border-b border-gray-30 py-6">
					<TrFormRow
						required={true}
						label={'기업명'}
						error={state.errors?.company_name && state.errors.company_name}
					>
						{' '}
						<Input name="company_name" id="company_name" required={true} />
					</TrFormRow>
					<TrFormRow
						label={'지원직무(선택)'}
						required={false}
						error={state.errors?.tr_position && state.errors.tr_position}
					>
						{' '}
						<Input name="tr_position" id="tr_position" />
					</TrFormRow>
					<TrFormRow label={'채용형태'} error={state.errors?.tr_career && state.errors.tr_career}>
						{' '}
						<Select name="tr_career" id="tr_career" required={true}>
							{TR_CAREER.map((el) => (
								<option key={el}>{el}</option>
							))}
						</Select>
					</TrFormRow>
					<TrFormRow
						label={'응시년도'}
						error={state.errors?.tr_year && state.errors.tr_year}
					>
						<Select name="tr_year" id="tr_year" required={true}>
							{years.map((el) => (
								<option value={el} key={el}>
									{el}년
								</option>
							))}
						</Select>
					</TrFormRow>
				</div>
				<div className="border-b border-gray-30 py-6">
					<TrFormRow
						label={'전체 문제 수'}
						error={state.errors?.tr_problem_num && state.errors.tr_problem_num}
					>
						{' '}
						<Input name="tr_problem_num" id="tr_problem_num" type={'number'} required={true} />
					</TrFormRow>
					<TrFormRow
						label={'푼 문제 수'}
						error={state.errors?.tr_solve_num && state.errors.tr_solve_num}
					>
						{' '}
						<Input name="tr_solve_num" id="tr_solve_num" type={'number'} required={true} />
					</TrFormRow>
					<TrFormRow label={'합격 여부'}>
						{' '}
						<Select id="tr_pass_status" name="tr_pass_status" required={true}>
							{PASS_STATUS.map((el) => (
								<option key={el}>{el}</option>
							))}
						</Select>
					</TrFormRow>
				</div>
				<div className="border-b border-gray-30 py-6">
					<div className="flex w-full flex-wrap py-4 text-base">
						<div className="w-full font-bold text-gray-80">
							문제 유형<span className="textsm text-main-base"> *</span>
						</div>
						<div className="mt-4 flex w-full justify-end text-text-base">
							<div className="mt-4 flex w-full flex-col text-text-base">
								<TrComboBox className="max-w-full" list={PROBLEM_TYPE} onClick={addProblem} />
								<div>
									{Array.from(problems).map((el: string) => (
										<LanguageToggleButton key={el} text={el} onClick={() => removeProblem(el)} />
									))}
								</div>
								<div className="flex h-6 w-full items-center justify-end">
									{state.errors?.tr_problem_type &&
										state.errors?.tr_problem_type.map((error: string) => (
											<p key={error} className="text-sm text-red-warning">
												{error}
											</p>
										))}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="py-6">
					<div className="flex w-full flex-wrap py-4 text-base">
						<div className="w-full font-bold text-gray-80">
							한줄 후기<span className="textsm text-main-base"> *</span>
						</div>
						<div className="mt-4 flex w-full justify-end text-text-base">
							<textarea
							maxLength={100}
								id="tr_comment"
								name="tr_comment"
								className="h-36 w-full rounded-lg border border-gray-50 p-3 resize-none"
								placeholder="간단한 시험 후기를 들려주세요! 직접적으로 시험의 지문, 테스트케이스, 힌트 등을 게시하게 되면 문제 유출로 간주될 수 있으니 조심해주세요!"
							/>
						</div>
						<div className="flex h-6 w-full items-center justify-end">
							{state.errors?.tr_comment &&
								state.errors?.tr_comment.map((error: string) => (
									<p key={error} className="text-sm text-red-warning">
										{error}
									</p>
								))}
						</div>
					</div>
				</div>
			</div>
			<BaseSubmitButton text="제출" />
			<div className="flex h-6 w-full items-center justify-end">
				{state.message && <p className="text-sm text-red-warning">{state.message}</p>}
			</div>
		</form>
		{/* {
			state.fullfilled?
			<BasicAlert onClick={async()=>await redirectToPrev()}>
				<div>제출에 성공하였습니다.</div>
			</BasicAlert>
			:
			<>
		} */}
		</>
		
	);
}
