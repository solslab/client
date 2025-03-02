'use server';

import { redirect } from 'next/navigation';
import { getToken, updateToken } from '@/app/lib/utils/cookie';
import { SPRING_URL } from '@/app/lib/utils/constants';
import { FeedbackFormSchema } from '../../schemas/review';
import { FeedBackState } from '@/app/lib/types/actions/review';

export async function createFeedBack(prevState: FeedBackState, formData: FormData) {
	const validatedFields = FeedbackFormSchema.safeParse({
		rating: formData.get('rating'),
		feedback_content: formData.get('feedback_content') || undefined
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: '오류가 발생했습니다.',
			fullfiled: {
				value: false,
				status: true
			}
		};
	}

	try {
		const response = await fetch(`${SPRING_URL}/feedback`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(validatedFields.data)
		});

		if (!response.ok) {
			const res = await response.text();
			console.error(res);
			throw new Error(`${response.status}`);
		}

		return {
			errors: {},
			message: '피드백이 정상 제출되었습니다.',
			fullfiled: {
				value: true,
				status: true
			}
		};
	} catch (error) {
		console.error('createFeedBack중 오류발생', error);
		return {
			errors: {},
			message: '피드백이 정상 제출되지 않았습니다.',
			fullfiled: {
				value: true,
				status: false
			}
		};
	}
}
