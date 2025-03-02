'use server';

import { redirect } from 'next/navigation';
import { getLastRoute, getToken, updateToken } from '@/app/lib/utils/cookie';
import { SPRING_URL } from '@/app/lib/utils/constants';
import { SuggestionFormSchema } from '../../schemas/suggestion';
import { SuggestionState } from '@/app/lib/types/actions/suggestion';

export async function createSuggestion(
	prevState: SuggestionState,
	formData: FormData,
	positionId: string
) {
	const validatedFields = SuggestionFormSchema.safeParse({
		suggestion_content: formData.get('suggestion_content')
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: '오류가 발생했습니다.'
		};
	}

	const tokenCookie = await getToken();
	const pathCookie = await getLastRoute();
	const token = tokenCookie?.value || undefined;
	const path = pathCookie?.value || '/';
	try {
		if (!token) {
			redirect('/login');
		}

		const response = await fetch(`${SPRING_URL}/suggestion/${positionId}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(validatedFields.data)
		});

		if (!response.ok) {
			throw new Error(`${response.status}`);
		}

		const newToken = response.headers.get('Authorization');
		if (newToken) {
			updateToken(newToken);
		}
		const data = await response.json();
		return {
			submitted: true,
			fullfilled: true
		};
	} catch (error) {
		console.error('createSuggestion중 오류발생', error);
		return {
			submitted: true,
			fullfilled: false
		};
	}
}
