'use server';

import { cookies } from 'next/headers';
import { SPRING_URL } from '@/app/lib/utils/constants';
import { getToken, updateToken } from '@/app/lib/utils/cookie';
import { TierFormSchema } from '../../schemas/user';
import { revalidatePath } from 'next/cache';
import { TierState } from '@/app/lib/types/actions';
import { redirect } from 'next/navigation';

export async function updateTier(formData: FormData) {
	let redirectFlag = false;

	const validatedFields = TierFormSchema.safeParse({
		al_platform: formData.get('al_platform'),
		member_tier: formData.get('member_tier')
	});
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: '오류가 발생했습니다.'
		};
	}

	const tokenCookie = await getToken();
	const token = tokenCookie?.value || undefined;
	if (!token) {
		redirect('/login');
	}
	try {
		const response = await fetch(`${SPRING_URL}/member`, {
			method: 'PUT',
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
		redirectFlag = true;
		return {
			message: null
		};
	} catch (error) {
		console.error(error);
		return {
			message: '티어 설정 중 문제가 발생했습니다.'
		};
	} finally {
		if (redirectFlag) {
			redirect('/testReview');
		}
	}
}
