'use server';

import { redirect } from 'next/navigation';
import { getLastRoute, getToken, updateToken } from '@/app/lib/utils/cookie';
import { SPRING_URL } from '@/app/lib/utils/constants';
import { AdditionalInformationFormSchema } from '@/app/lib/server/schemas/user';
import { AdditionalInformationState } from '@/app/lib/types/actions/user';

export async function updateAdditionalInformation(
	prevState: AdditionalInformationState,
	formData: FormData
) {
	let redirectFlag = false;

	const validatedFields = AdditionalInformationFormSchema.safeParse({
		nickname: formData.get('nickname') || undefined,
		al_platform: formData.get('al_platform'),
		member_tier: formData.get('member_tier'),
		prefer_languages: formData.get('prefer_languages'),
		prefer_industries: formData.get('prefer_industries')
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
		return data;
	} catch (error) {
		console.error(error);
	} finally {
		if (redirectFlag) {
			redirect(path);
		}
	}
}
