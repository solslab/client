'use server';

import { redirect } from 'next/navigation';
import { getToken, updateToken } from '@/app/lib/utils/cookie';
import { SPRING_URL } from '@/app/lib/utils/constants';
import { TestReviewFormSchema } from '../../schemas/review';
import { TestReviewState } from '@/app/lib/types/actions/review';

export async function createTestReview(prevState: TestReviewState, formData: FormData) {
	let flag = false;

	const validatedFields = TestReviewFormSchema.safeParse({
		company_id: formData.get('company_id') || undefined,
		company_name: formData.get('company_name'),
		tr_year: formData.get('tr_year'),
		tr_position: formData.get('tr_position'),
		tr_career: formData.get('tr_career'),
		tr_problem_num: formData.get('tr_problem_num'),
		tr_solved_num: formData.get('tr_solved_num'),
		tr_pass_status: formData.get('tr_pass_status'),
		tr_problem_type: formData.get('tr_problem_type'),
		tr_comment: formData.get('tr_comment')
	});
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: '잘못된 필드가 있습니다.'
		};
	}

	const tokenCookie = await getToken();
	const token = tokenCookie?.value || undefined;
	if (!token) {
		redirect('/login');
	}
	try {
		const response = await fetch(`${SPRING_URL}/tr`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(validatedFields.data)
		});

		if (!response.ok) {
			const result = await response.text();
			throw new Error(`${result}`);
		}

		const newToken = response.headers.get('Authorization');
		if (newToken) {
			updateToken(newToken);
		}
		flag = true;
		const data = await response.json();
		return {
			fullfilled: true
		};
	} catch (error) {
		if (error instanceof Error) {
			console.log('createTestReview중 오류 발생:', typeof error);
			const parsedError: { error_code: string; message: string } = JSON.parse(error.message);
			return { message: parsedError.message || '알 수 없는 오류 발생' };
		} else {
			return {
				message: '제출 중 문제가 발생했습니다.'
			};
		}
	}
	// finally {
	//     if (flag) {
	//         await redirectToPrev();
	//     }
	// }
}
