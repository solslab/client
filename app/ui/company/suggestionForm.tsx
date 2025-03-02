'use client';
import { createSuggestion } from '@/app/lib/server/mutations/suggestion';
import BaseSubmitButton from '@/app/ui/common/baseSubmitButton';
import { useActionState } from 'react';
import BasicAlert from '../common/basicAlert';
import { redirectToPrev } from '@/app/lib/utils/cookie';
import { SuggestionState } from '@/app/lib/types/actions';

export default function SuggestionForm({ position_id }: { position_id: string }) {
	const initialState: SuggestionState = { errors: {}, message: '' };
	const [state, formAction] = useActionState((prevState: SuggestionState, formData: FormData) => {
		return createSuggestion(prevState, formData, position_id);
	}, initialState);

	return (
		<>
			<form action={formAction}>
				<div className="mt-4 w-full">
					{/* <input
        className=" w-full border border-gray-50 px-2 py-1 rounded-lg"
        placeholder="제목을 작성해주세요."
      /> */}
					<textarea
						id="suggestion_content"
						name="suggestion_content"
						className="mt-4 h-80 w-full resize-none rounded-lg border border-gray-50 p-3 focus:outline-none"
						placeholder="내용을 작성해주세요."
						maxLength={200}
					/>
					<div className="flex min-h-7 justify-end">
						{state.errors?.suggestion_content &&
							state.errors.suggestion_content.map((error: string) => (
								<p className="mb-1 text-sm text-red-500" key={error}>
									{error}
								</p>
							))}
					</div>
					<BaseSubmitButton text="제출" />
				</div>
			</form>
			{state?.submitted == true ? (
				<BasicAlert onClick={() => redirectToPrev()}>
					{state?.fullfilled == true ? (
						<div className="text-text-base">제출이 완료되었습니다.</div>
					) : (
						<div className="text-text-base">제출 중 문제가 발생하였습니다.</div>
					)}
				</BasicAlert>
			) : undefined}
		</>
	);
}
